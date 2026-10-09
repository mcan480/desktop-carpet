// Desktop Carpet: a cloth rug that lies on the Windows desktop, unlocked by a desktopcarpet.com license.
const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, screen, shell, powerMonitor } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');

app.setAppUserModelId('com.desktopcarpet.app');
if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0); }

const SITE = 'https://desktopcarpet.com';
const URLS = { home: `${SITE}/`, pricing: `${SITE}/#pricing` };
const AUTOSTART = process.argv.includes('--autostart');
const STATE_FILE = () => path.join(app.getPath('userData'), 'carpet-state.json');
const SETTINGS_FILE = () => path.join(app.getPath('userData'), 'settings.json');

let win = null;          // the transparent rug window
let panel = null;        // the control panel window
let tray = null;
let rugReady = false;
let userHidden = false;  // the user chose "hide the carpet"
let rugState = { style: 'tabriz', size: 'orta', weight: 'normal' };
let settings = { onTop: false, lang: 'auto' };
let license = { state: 'checking' };
let lic = null;          // LicenseClient

// ---------- strings (shared with the panel) ----------
const I18N = require('../panel/i18n.js');
const LANG = () => (settings.lang && settings.lang !== 'auto' && I18N.LANGS[settings.lang])
  ? settings.lang
  : I18N.pick([...(app.getPreferredSystemLanguages?.() || []), app.getLocale()]);
// Menu keys map onto the panel's strings.
const MENU_KEYS = { open: 'openApp', show: 'showRug', hide: 'hideRug', locked: 'lockedMenu',
  tabriz: 's_tabriz', klasik: 's_klasik', lacivert: 's_lacivert', zumrut: 's_zumrut', kilim: 's_kilim',
  kucuk: 'small', orta: 'medium', buyuk: 'large', hafif: 'light', normal: 'normal', agir: 'heavy' };
const t = (k) => { if (k === 'tip') return 'Desktop Carpet'; const v = I18N.strings(LANG())[MENU_KEYS[k] || k]; return typeof v === 'string' ? v : k; };

// ---------- small persistence helpers ----------
function readJson(file, fallback) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
function writeJson(file, data) { try { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(data)); } catch (e) { console.error(e); } }

// ---------- keep the rug window just above the desktop icons, below app windows ----------
let user32 = null;
function loadUser32() {
  if (process.platform !== 'win32' || user32) return user32;
  try {
    const koffi = require('koffi');
    const lib = koffi.load('user32.dll');
    user32 = {
      FindWindowW: lib.func('__stdcall', 'FindWindowW', 'intptr_t', ['str16', 'str16']),
      SetWindowLongPtrW: lib.func('__stdcall', 'SetWindowLongPtrW', 'intptr_t', ['intptr_t', 'int', 'intptr_t']),
      GetAsyncKeyState: lib.func('__stdcall', 'GetAsyncKeyState', 'int16_t', ['int']),
      GetSystemMetrics: lib.func('__stdcall', 'GetSystemMetrics', 'int', ['int']),
      WindowFromPoint: lib.func('__stdcall', 'WindowFromPoint', 'intptr_t', [koffi.struct('POINT', { x: 'long', y: 'long' })]),
      GetAncestor: lib.func('__stdcall', 'GetAncestor', 'intptr_t', ['intptr_t', 'uint']),
      GetClassNameW: lib.func('__stdcall', 'GetClassNameW', 'int', ['intptr_t', 'uint16_t *', 'int']),
    };
  } catch (e) { console.error('koffi/user32 unavailable:', e.message); }
  return user32;
}

function pinToDesktop() {
  const u = loadUser32();
  if (!u || !win || win.isDestroyed()) return;
  try {
    const buf = win.getNativeWindowHandle();
    const hwnd = Number(buf.length >= 8 ? buf.readBigUInt64LE(0) : buf.readUInt32LE(0));
    const progman = u.FindWindowW('Progman', null);
    // GWLP_HWNDPARENT = -8: Progman (the desktop) becomes our owner, so the rug stays above the
    // icons but under every app window, and survives "Show desktop" (Win+D).
    if (progman) u.SetWindowLongPtrW(hwnd, -8, progman);
  } catch (e) { console.error('pinToDesktop failed:', e.message); }
}

// Physical state of the (logical) left mouse button; null when it can't be read.
function leftButtonDown() {
  const u = loadUser32();
  if (!u?.GetAsyncKeyState) return null;
  try {
    const swapped = u.GetSystemMetrics(23) !== 0; // SM_SWAPBUTTON: left-handed mouse setting
    return (u.GetAsyncKeyState(swapped ? 0x02 : 0x01) & 0x8000) !== 0;
  } catch { return null; }
}

// True when a click at this screen point (physical pixels) lands on the rug window or the bare
// desktop, i.e. not on some app window or the taskbar that happens to cover the rug.
function pointOnDesktop(px, py) {
  const u = loadUser32();
  if (!u?.WindowFromPoint) return true;
  try {
    const root = u.GetAncestor(u.WindowFromPoint({ x: px, y: py }), 2); // GA_ROOT
    if (!root) return true;
    if (root === nativeHwnd()) return true;
    const buf = new Uint16Array(64);
    const n = u.GetClassNameW(root, buf, 64);
    const cls = String.fromCharCode(...buf.slice(0, Math.max(0, n)));
    return cls === 'Progman' || cls === 'WorkerW';
  } catch { return true; }
}

function nativeHwnd() {
  const buf = win.getNativeWindowHandle();
  return Number(buf.length >= 8 ? buf.readBigUInt64LE(0) : buf.readUInt32LE(0));
}

function createRugWindow() {
  const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
  win = new BrowserWindow({
    x, y, width, height, frame: false, transparent: true, backgroundColor: '#00000000',
    resizable: false, movable: false, minimizable: false, maximizable: false, fullscreenable: false,
    skipTaskbar: true, focusable: false, hasShadow: false, show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false, backgroundThrottling: false },
  });
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile(path.join(__dirname, '..', 'app', 'index.html'));
  win.once('ready-to-show', () => { rugReady = true; updateRugVisibility(); });
  setInterval(() => { if (!settings.onTop && win.isVisible()) pinToDesktop(); }, 15000);

  // Poll the cursor and the left mouse button. Windows sometimes stops sending mouse events to a
  // transparent click-through window (after menus, overlays like the NVIDIA one, focus changes),
  // so the rug follows this instead of relying on those events alone.
  let lastCursor = '';
  setInterval(() => {
    if (!win || win.isDestroyed() || !win.isVisible()) return;
    const p = screen.getCursorScreenPoint();
    const down = leftButtonDown();
    const key = p.x + ',' + p.y + ',' + down;
    if (key === lastCursor) return;
    const pressed = down && !lastCursor.endsWith(',true');
    lastCursor = key;
    const b = win.getBounds();
    let free = true;
    if (pressed) { const sp = screen.dipToScreenPoint(p); free = pointOnDesktop(Math.round(sp.x), Math.round(sp.y)); }
    send('cursor', { x: p.x - b.x, y: p.y - b.y, down, free });
  }, 16);
}

// An expired paid license keeps the Madder Red carpet; an expired free trial locks everything.
const expiredPaid = () => license.state === 'expired' && license.plan !== 'trial';
const unlocked = () => ['active', 'offline'].includes(license.state) || expiredPaid();

// Show the rug only when the license allows it and the user hasn't hidden it.
function updateRugVisibility() {
  if (!win || win.isDestroyed() || !rugReady) return;
  const want = unlocked() && !userHidden;
  if (want && !win.isVisible()) {
    fitToScreen();
    win.setIgnoreMouseEvents(true, { forward: true });
    win.showInactive();
    if (settings.onTop) win.setAlwaysOnTop(true, 'floating'); else pinToDesktop();
    refreshTransparency();
    send('show');
    send('reset-input');
  } else if (!want && win.isVisible()) {
    send('hide');
    setTimeout(() => { if (!(unlocked() && !userHidden)) win.hide(); }, 50);
  }
  refreshMenus();
  broadcast();
}

// Windows sometimes shows a transparent window with an opaque gray background. Re-applying the
// clear background and nudging the size makes DWM rebuild the surface with transparency.
function refreshTransparency() {
  const nudge = () => {
    if (!win || win.isDestroyed() || !win.isVisible()) return;
    win.setBackgroundColor('#00000000');
    const b = win.getBounds();
    win.setBounds({ ...b, height: b.height - 1 });
    win.setBounds(b);
    win.webContents.invalidate();
    send('redraw');
  };
  [60, 400, 1200].forEach((ms) => setTimeout(nudge, ms));
}

function fitToScreen() {
  if (!win || win.isDestroyed()) return;
  const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
  win.setBounds({ x, y, width, height });
  send('layout');
}

function send(cmd, arg) {
  if (win && !win.isDestroyed()) win.webContents.send('command', cmd, arg);
}

// ---------- rug commands (from panel, menus) ----------
function rugCommand(cmd, arg) {
  if (!unlocked() && cmd !== 'hide') return;
  if (cmd === 'show') { userHidden = false; updateRugVisibility(); return; }
  if (cmd === 'hide') { userHidden = true; updateRugVisibility(); return; }
  if (cmd === 'style' && expiredPaid() && arg !== 'klasik') return;
  if (cmd === 'style' || cmd === 'size' || cmd === 'weight') rugState[cmd] = arg; // optimistic, renderer confirms
  send(cmd, arg);
  broadcast();
}

function applySetting(name, value) {
  if (name === 'onTop') {
    settings.onTop = !!value;
    writeJson(SETTINGS_FILE(), settings);
    if (win && !win.isDestroyed()) {
      win.setAlwaysOnTop(settings.onTop, 'floating');
      if (!settings.onTop) pinToDesktop();
    }
  } else if (name === 'lang') {
    settings.lang = I18N.LANGS[value] ? value : 'auto';
    writeJson(SETTINGS_FILE(), settings);
  } else if (name === 'openAtLogin') {
    app.setLoginItemSettings({ openAtLogin: !!value, args: ['--autostart'] });
  }
  refreshMenus();
  broadcast();
}

// ---------- license ----------
function storedKey() {
  const d = readJson(path.join(app.getPath('userData'), 'desktopcarpet-license.json'), {});
  return d.key || null;
}

function applyLicense(s) {
  // A server hiccup while the carpet is already unlocked shouldn't roll it up.
  if (s.state === 'error' && ['active', 'offline'].includes(license.state)) return;
  license = { ...s, key: storedKey() };
  if (expiredPaid() && rugState.style !== 'klasik') send('style', 'klasik');
  updateRugVisibility();
  if (!unlocked() && license.state !== 'checking') openPanel();
}

async function initLicense() {
  try {
    const { LicenseClient } = await import(pathToFileURL(path.join(__dirname, 'license.mjs')).href);
    lic = new LicenseClient({ dataDir: app.getPath('userData'), deviceName: os.hostname() });
  } catch (e) {
    console.error('license module failed', e);
    applyLicense({ state: 'error', reason: 'unknown' });
    return;
  }
  await recheck();
  setInterval(recheck, 6 * 3600 * 1000);
  powerMonitor.on('resume', () => setTimeout(recheck, 5000));
}

async function recheck() {
  if (!lic) return license;
  let s;
  try { s = await lic.check(); } catch { s = { state: 'error', reason: 'unknown' }; }
  applyLicense(s);
  return license;
}

// ---------- control panel window ----------
function openPanel() {
  if (panel && !panel.isDestroyed()) {
    if (panel.isMinimized()) panel.restore();
    panel.show(); panel.focus();
    return;
  }
  panel = new BrowserWindow({
    width: 460, height: Math.min(820, screen.getPrimaryDisplay().workArea.height - 40), minWidth: 420, minHeight: 560, show: false, title: 'Desktop Carpet',
    backgroundColor: '#c4925c', icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true,
    titleBarStyle: 'hidden', titleBarOverlay: { color: '#22130c', symbolColor: '#f2e6cc', height: 40 },
    webPreferences: { preload: path.join(__dirname, 'panel-preload.cjs'), contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  panel.setMenu(null);
  panel.loadFile(path.join(__dirname, '..', 'panel', 'index.html'));
  panel.once('ready-to-show', () => { panel.show(); panel.moveTop(); panel.focus(); });
  panel.on('closed', () => { panel = null; });
  // Links open in the real browser, never inside the app.
  panel.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  panel.webContents.on('will-navigate', (e) => e.preventDefault());
}

function panelState() {
  return {
    lang: LANG(),
    version: app.getVersion(),
    license,
    rug: { ...rugState, hidden: userHidden },
    update: { state: update.state, version: update.version },
    settings: { onTop: settings.onTop, langSetting: settings.lang || 'auto', openAtLogin: app.getLoginItemSettings({ args: ['--autostart'] }).openAtLogin },
  };
}

function broadcast() {
  if (panel && !panel.isDestroyed()) panel.webContents.send('state', panelState());
}

// ---------- menus (tray + right-click on the rug) ----------
function buildMenu() {
  const radio = (group, keys) => keys.map((k) => ({
    label: t(k), type: 'radio', checked: rugState[group] === k,
    enabled: !(group === 'style' && expiredPaid() && k !== 'klasik'),
    click: () => rugCommand(group, k),
  }));
  const items = [{ label: t('open'), click: openPanel }];
  if (update.state === 'ready') items.push({ label: I18N.strings(LANG()).updMenu(update.version), click: installUpdate });
  items.push({ type: 'separator' });
  if (unlocked()) {
    items.push(
      { label: t('flatten'), click: () => rugCommand('flatten') },
      { label: t('center'), click: () => rugCommand('center') },
      userHidden ? { label: t('show'), click: () => rugCommand('show') } : { label: t('hide'), click: () => rugCommand('hide') },
      { type: 'separator' },
      { label: t('pattern'), submenu: radio('style', ['tabriz', 'klasik', 'lacivert', 'zumrut', 'kilim']) },
      { label: t('size'), submenu: radio('size', ['kucuk', 'orta', 'buyuk']) },
      { label: t('weight'), submenu: radio('weight', ['hafif', 'normal', 'agir']) },
    );
  } else {
    items.push({ label: t('locked'), enabled: false });
  }
  items.push({ type: 'separator' }, { label: t('quit'), click: () => app.quit() });
  return Menu.buildFromTemplate(items);
}

function refreshMenus() {
  if (!tray) return;
  const menu = buildMenu();
  menu.on('menu-will-close', () => setTimeout(() => send('reset-input'), 50));
  tray.setContextMenu(menu);
}

// ---------- automatic updates (GitHub Releases) ----------
// The newest release on github.com/mcan480/desktop-carpet with a "DesktopCarpet-Setup.exe" asset is downloaded in the
// background, checked against its size and SHA-256, then installed silently when the user clicks "Restart and update".
const UPDATE_API = 'https://api.github.com/repos/mcan480/desktop-carpet/releases/latest';
const UPDATE_ASSET = 'DesktopCarpet-Setup.exe';
let update = { state: 'idle' };   // idle | downloading | ready

function newer(a, b) {
  const pa = String(a).split('.').map((n) => parseInt(n, 10) || 0), pb = String(b).split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) { if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0); }
  return false;
}

async function checkForUpdate() {
  if (!app.isPackaged || update.state === 'downloading') return;
  try {
    const r = await fetch(UPDATE_API, { headers: { accept: 'application/vnd.github+json', 'user-agent': 'DesktopCarpet/' + app.getVersion() }, signal: AbortSignal.timeout(15000) });
    if (!r.ok) return;
    const rel = await r.json();
    const version = String(rel.tag_name || '').replace(/^v/i, '');
    if (rel.draft || rel.prerelease || !newer(version, app.getVersion())) return;
    if (update.state === 'ready' && update.version === version) return;
    const asset = (rel.assets || []).find((a) => a.name === UPDATE_ASSET);
    if (!asset) return;

    update = { state: 'downloading', version };
    const file = path.join(app.getPath('temp'), `DesktopCarpet-Setup-${version}.exe`);
    const res = await fetch(asset.browser_download_url, { headers: { 'user-agent': 'DesktopCarpet/' + app.getVersion() } });
    if (!res.ok || !res.body) throw new Error('download ' + res.status);
    const hash = require('crypto').createHash('sha256');
    const out = fs.createWriteStream(file);
    let size = 0;
    for await (const chunk of res.body) { hash.update(chunk); size += chunk.length; if (!out.write(chunk)) await new Promise((ok) => out.once('drain', ok)); }
    await new Promise((ok, bad) => out.end((e) => (e ? bad(e) : ok())));
    const digest = 'sha256:' + hash.digest('hex');
    if (size !== asset.size || (asset.digest && asset.digest !== digest)) { fs.rmSync(file, { force: true }); throw new Error('bad download'); }
    update = { state: 'ready', version, file };
  } catch (e) {
    console.error('update check failed:', e.message);
    if (update.state === 'downloading') update = { state: 'idle' };
  }
  refreshMenus();
  broadcast();
}

function installUpdate() {
  if (update.state !== 'ready' || !fs.existsSync(update.file)) return;
  // /S = silent NSIS install; the installer closes us, replaces the files and starts the new version.
  require('child_process').spawn(update.file, ['/S'], { detached: true, stdio: 'ignore' }).unref();
  app.quit();
}

// ---------- app lifecycle ----------
app.whenReady().then(() => {
  settings = { ...settings, ...readJson(SETTINGS_FILE(), {}) };
  createRugWindow();

  tray = new Tray(path.join(__dirname, process.platform === 'win32' ? 'tray.ico' : 'tray.png'));
  tray.setToolTip(t('tip'));
  tray.on('click', openPanel);
  refreshMenus();

  if (!AUTOSTART) openPanel();
  initLicense();
  setTimeout(checkForUpdate, 20 * 1000);
  setInterval(checkForUpdate, 6 * 3600 * 1000);

  screen.on('display-metrics-changed', fitToScreen);
  screen.on('display-added', fitToScreen);
  screen.on('display-removed', fitToScreen);

  if (process.env.DC_SMOKE) runSmoke();
});

// Opening the app again (desktop shortcut, Start menu) brings up the panel and the rug.
app.on('second-instance', () => {
  openPanel();
  if (unlocked() && userHidden) { userHidden = false; updateRugVisibility(); }
});
// Closing the panel keeps the carpet running in the tray.
app.on('window-all-closed', () => {});

// ---------- IPC: rug window ----------
ipcMain.on('ignore-mouse', (_e, ignore) => { if (win && !win.isDestroyed()) win.setIgnoreMouseEvents(!!ignore, { forward: true }); });
ipcMain.on('show-menu', () => {
  if (!win || !win.isVisible()) return;
  buildMenu().popup({ callback: () => setTimeout(() => send('reset-input'), 50) });
});
ipcMain.on('report-state', (_e, s) => {
  rugState = { ...rugState, style: s.style ?? rugState.style, size: s.size ?? rugState.size, weight: s.weight ?? rugState.weight };
  if (expiredPaid() && rugState.style !== 'klasik') send('style', 'klasik');
  refreshMenus();
  broadcast();
});
ipcMain.on('save-state', (_e, s) => writeJson(STATE_FILE(), s));
ipcMain.handle('load-state', () => readJson(STATE_FILE(), null));

// ---------- IPC: panel ----------
ipcMain.on('panel-ready', () => broadcast());
ipcMain.handle('license-activate', async (_e, key) => {
  if (!lic) return { state: 'error', reason: 'unknown' };
  let s;
  try { s = await lic.activate(String(key || '').trim().toUpperCase()); } catch { s = { state: 'error', reason: 'offline' }; }
  // This computer already used its free trial: say so in the panel and open the prices.
  if (s.reason === 'trial_used') shell.openExternal(URLS.pricing);
  if (['active', 'expired', 'device_limit'].includes(s.state)) {
    if (s.state !== 'device_limit') userHidden = false;
    license = { state: 'none' }; // let applyLicense open/close things freshly
    applyLicense(s);
  }
  return s;
});
ipcMain.handle('license-recheck', () => recheck());
ipcMain.handle('license-deactivate', async () => {
  if (lic) await lic.deactivate();
  applyLicense({ state: 'none' });
  return license;
});
ipcMain.handle('license-forget', () => { applyLicense({ state: 'none' }); return license; });
ipcMain.handle('license-recover', async (_e, email) => {
  try {
    const r = await fetch(`${SITE}/api/license/recover`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: String(email || '') }),
      signal: AbortSignal.timeout(10000),
    });
    return await r.json();
  } catch { return { ok: false, reason: 'offline' }; }
});
ipcMain.on('rug', (_e, cmd, arg) => rugCommand(cmd, arg));
ipcMain.on('setting', (_e, name, value) => applySetting(name, value));
ipcMain.on('open-url', (_e, which) => { if (URLS[which]) shell.openExternal(URLS[which]); });
ipcMain.on('quit', () => app.quit());
ipcMain.on('install-update', () => installUpdate());

// ---------- automated smoke test (DC_SMOKE=<out dir>) ----------
async function runSmoke() {
  const out = process.env.DC_SMOKE;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const shot = async (w, name) => { if (w && !w.isDestroyed()) fs.writeFileSync(path.join(out, name), (await w.webContents.capturePage()).toPNG()); };
  if (process.env.DC_LANG) { settings.lang = process.env.DC_LANG; refreshMenus(); }
  await wait(6000);
  update = { state: 'ready', version: '1.0.2', file: 'none' }; broadcast();
  await wait(500);
  console.log('SMOKE license', JSON.stringify(license), 'rugVisible', win.isVisible(), 'lang', LANG());
  await shot(panel, 'panel-locked.png');
  if (process.env.DC_SMOKE_KEY) {
    const r = await lic.activate(process.env.DC_SMOKE_KEY);
    console.log('SMOKE activate', JSON.stringify(r));
  }
  // Simulate an unlocked state to capture the active panel and the rug.
  applyLicense({ state: 'active', plan: 'yearly', expiresAt: new Date(Date.now() + 212 * 864e5).toISOString(), daysLeft: 212, devices: 1, maxDevices: 3 });
  license.key = 'DC-7K2P-QX4M-9WRT-H3ND';
  broadcast();
  await wait(3000);
  console.log('SMOKE after unlock rugVisible', win.isVisible());
  await shot(panel, 'panel-active.png');
  await shot(win, 'rug.png');
  applyLicense({ state: 'expired', plan: 'monthly', expiresAt: new Date(Date.now() - 2 * 864e5).toISOString() });
  await wait(1500);
  await shot(panel, 'panel-expired.png');
  applyLicense({ state: 'active', plan: 'trial', expiresAt: new Date(Date.now() + 2 * 864e5).toISOString(), daysLeft: 2, devices: 1, maxDevices: 1 });
  license.key = 'DC-7K2P-QX4M-9WRT-H3ND'; broadcast();
  await wait(1500);
  await shot(panel, 'panel-trial.png');
  applyLicense({ state: 'expired', plan: 'trial', expiresAt: new Date(Date.now() - 864e5).toISOString() });
  await wait(1500);
  console.log('SMOKE trial expired rugVisible', win.isVisible());
  await shot(panel, 'panel-trial-expired.png');
  applyLicense({ state: 'none' });
  await wait(800);
  await panel.webContents.executeJavaScript(`(() => { const m = document.querySelector('#keyMsg'); m.hidden = false; m.className = 'msg bad'; return true; })()`);
  // Same text the panel shows after a trial_used answer from the server:
  await panel.webContents.executeJavaScript(`document.querySelector('#keyMsg').textContent = ${JSON.stringify('')} || window.__t_trial_used`);
  await wait(500);
  await shot(panel, 'panel-trial-used.png');
  app.quit();
}
