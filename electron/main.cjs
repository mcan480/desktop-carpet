// Desktop Carpet: a cloth rug that lies on the Windows or macOS desktop, unlocked by a desktopcarpet.com license.
const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, screen, shell, powerMonitor, desktopCapturer } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');

const IS_MAC = process.platform === 'darwin';
if (process.platform === 'win32') app.setAppUserModelId('com.desktopcarpet.app');
if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0); }

const SITE = 'https://desktopcarpet.com';
const URLS = { home: `${SITE}/`, pricing: `${SITE}/#pricing` };
let AUTOSTART = process.argv.includes('--autostart');
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
I18N.setPlatform(process.platform);
const LANG = () => (settings.lang && settings.lang !== 'auto' && I18N.LANGS[settings.lang])
  ? settings.lang
  : I18N.pick([...(app.getPreferredSystemLanguages?.() || []), app.getLocale()]);
// Menu keys map onto the panel's strings.
const MENU_KEYS = { open: 'openApp', show: 'showRug', hide: 'hideRug', locked: 'lockedMenu',
  tabriz: 's_tabriz', klasik: 's_klasik', lacivert: 's_lacivert', zumrut: 's_zumrut', kilim: 's_kilim', gorunmez: 's_gorunmez', balkabagi: 's_balkabagi', orumcek: 's_orumcek', hayalet: 's_hayalet',
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

// macOS: Objective-C runtime and CoreGraphics through koffi, for the window level and the mouse button.
let mac = null;
function loadMac() {
  if (!IS_MAC || mac) return mac;
  try {
    const koffi = require('koffi');
    const objc = koffi.load('/usr/lib/libobjc.A.dylib');
    const cg = koffi.load('/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics');
    const sel = objc.func('sel_registerName', 'uintptr_t', ['str']);
    mac = {
      sel,
      sendId: objc.func('objc_msgSend', 'uintptr_t', ['uintptr_t', 'uintptr_t']),
      sendLong: objc.func('objc_msgSend', 'void', ['uintptr_t', 'uintptr_t', 'long']),
      sendULong: objc.func('objc_msgSend', 'void', ['uintptr_t', 'uintptr_t', 'unsigned long']),
      levelForKey: cg.func('CGWindowLevelForKey', 'int32_t', ['int32_t']),
      buttonState: cg.func('CGEventSourceButtonState', 'bool', ['int32_t', 'uint32_t']),
    };
  } catch (e) { console.error('koffi/objc unavailable:', e.message); }
  return mac;
}

// macOS: put the rug window one level above Finder's desktop icons (kCGDesktopIconWindowLevel + 1), so it sits
// on the icons but under every app window, on every Space, and stays put in Mission Control and "Show Desktop".
function pinToDesktopMac() {
  const m = loadMac();
  if (!m || !win || win.isDestroyed()) return;
  try {
    const view = Number(win.getNativeWindowHandle().readBigUInt64LE(0)); // NSView*
    const nswin = m.sendId(view, m.sel('window'));
    if (!nswin) return;
    m.sendLong(nswin, m.sel('setLevel:'), m.levelForKey(18) + 1); // 18 = kCGDesktopIconWindowLevelKey
    // canJoinAllSpaces | stationary | ignoresCycle
    m.sendULong(nswin, m.sel('setCollectionBehavior:'), (1 << 0) | (1 << 4) | (1 << 6));
  } catch (e) { console.error('pinToDesktopMac failed:', e.message); }
}

function pinToDesktop() {
  if (IS_MAC) return pinToDesktopMac();
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
  if (IS_MAC) {
    const m = loadMac();
    try { return m ? !!m.buttonState(0, 0) : null; } catch { return null; } // combined session state, left button
  }
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
    skipTaskbar: true, focusable: false, hasShadow: false, show: false, acceptFirstMouse: true,
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false, sandbox: true, backgroundThrottling: false },
  });
  // The rug only ever shows its own page: no pop-ups, no navigating away.
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.webContents.on('will-navigate', (e) => e.preventDefault());
  win.setIgnoreMouseEvents(true, { forward: true });
  if (IS_MAC) win.setHiddenInMissionControl?.(true);
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
    if (pressed) {
      if (IS_MAC) free = false; // macOS delivers clicks to the rug reliably; the poll only tracks drags and releases
      else { const sp = screen.dipToScreenPoint(p); free = pointOnDesktop(Math.round(sp.x), Math.round(sp.y)); }
    }
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
  if (process.platform !== 'win32') return;
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
  if (rugState.style === 'gorunmez') sendWallpaper();
}

// ---------- wallpaper (for the Invisible rug, which shows what's behind it) ----------
// Sent to the rug window as { bytes | color, mode, scale, bounds, workArea }: the image file, how the OS lays it
// out on the primary display, and where the rug window (the work area) sits on that display.
let wallpaperSig = '', lastWallpaper = null;
const execFileP = (cmd, args, opts = {}) => new Promise((ok) =>
  require('child_process').execFile(cmd, args, { windowsHide: true, timeout: 15000, maxBuffer: 1 << 20, ...opts }, (e, out) => ok(e ? '' : String(out))));

async function readWallpaperWin() {
  const q = async (key, name) => {
    const out = await execFileP('reg', ['query', key, '/v', name]);
    const m = out.match(new RegExp(name + '\\s+REG_\\w+\\s+(.*)'));
    return m ? m[1].trim() : '';
  };
  const [file, style, tile, color] = await Promise.all([
    q('HKCU\\Control Panel\\Desktop', 'WallPaper'), q('HKCU\\Control Panel\\Desktop', 'WallpaperStyle'),
    q('HKCU\\Control Panel\\Desktop', 'TileWallpaper'), q('HKCU\\Control Panel\\Colors', 'Background')]);
  const rgb = (color.match(/\d+/g) || [0, 0, 0]).slice(0, 3).map(Number);
  // TranscodedWallpaper is Windows' own copy of the current picture (also for slideshows and Spotlight).
  const transcoded = path.join(process.env.APPDATA || '', 'Microsoft', 'Windows', 'Themes', 'TranscodedWallpaper');
  const src = file ? [transcoded, file].find((f) => { try { return fs.statSync(f).size > 0; } catch { return false; } }) : null;
  const mode = tile === '1' ? 'tile' : ({ 0: 'center', 2: 'stretch', 6: 'fit', 10: 'fill', 22: 'span' })[style] || 'fill';
  return { src, mode, color: `rgb(${rgb.join(',')})` };
}

let macWallpaperCache = { key: '', file: null };
async function readWallpaperMac() {
  const m = loadMac();
  let p = null;
  try {
    const koffi = require('koffi');
    const objc = koffi.load('/usr/lib/libobjc.A.dylib');
    m.getClass ??= objc.func('objc_getClass', 'uintptr_t', ['str']);
    m.sendId1 ??= objc.func('objc_msgSend', 'uintptr_t', ['uintptr_t', 'uintptr_t', 'uintptr_t']);
    m.sendStr ??= objc.func('objc_msgSend', 'str', ['uintptr_t', 'uintptr_t']);
    const ws = m.sendId(m.getClass('NSWorkspace'), m.sel('sharedWorkspace'));
    const screens = m.sendId(m.getClass('NSScreen'), m.sel('screens'));
    const main = m.sendId(screens, m.sel('firstObject')); // the screen with the menu bar
    const url = m.sendId1(ws, m.sel('desktopImageURLForScreen:'), main);
    if (url) p = m.sendStr(m.sendId(url, m.sel('path')), m.sel('UTF8String'));
  } catch (e) { console.error('wallpaper (mac) failed:', e.message); }
  if (!p || !fs.existsSync(p) || fs.statSync(p).isDirectory()) return { src: null, mode: 'fill', color: 'rgb(0,0,0)' };
  // Chromium can't read HEIC (dynamic and default macOS wallpapers): convert those with the built-in sips.
  if (/\.(heic|heif)$/i.test(p)) {
    const key = p + ':' + fs.statSync(p).mtimeMs;
    if (macWallpaperCache.key !== key) {
      const out = path.join(app.getPath('temp'), 'desktopcarpet-wallpaper.jpg');
      await execFileP('/usr/bin/sips', ['-s', 'format', 'jpeg', '-Z', '3840', p, '--out', out]);
      macWallpaperCache = { key, file: fs.existsSync(out) ? out : null };
    }
    p = macWallpaperCache.file;
  }
  return { src: p, mode: 'fill', color: 'rgb(0,0,0)' };
}

// Windows doesn't always center a cropped ("fill") wallpaper: on some setups it keeps more of the top.
// So instead of guessing, look once at a small capture of the screen (kept in memory only, never saved or sent) and
// find where along the cropped direction the picture really sits. Returns 0..1 (0 = start, 0.5 = centered, 1 = end).
const anchorCache = new Map();
async function measureWallpaperAnchor(src, mode, d) {
  if (process.platform !== 'win32' || !src || !['fill', 'span'].includes(mode)) return 0.5;
  const key = JSON.stringify([src, fs.statSync(src).mtimeMs, d.bounds]);
  if (anchorCache.has(key)) return anchorCache.get(key);
  try {
    const tw = 960, th = Math.round(tw * d.bounds.height / d.bounds.width);
    const sources = await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: tw, height: th } });
    const srcShot = sources.find((x) => x.display_id === String(d.id)) || sources[0];
    const shot = srcShot?.thumbnail;
    if (!shot || shot.isEmpty()) return 0.5;
    const ss = shot.getSize(), sb = shot.toBitmap(); // BGRA
    const img = nativeImage.createFromPath(src);
    if (img.isEmpty()) return 0.5;
    const is = img.getSize();
    const f = Math.max(ss.width / is.width, ss.height / is.height);
    const rw = Math.max(1, Math.round(is.width * f)), rh = Math.max(1, Math.round(is.height * f));
    const r = img.resize({ width: rw, height: rh, quality: 'good' }), rs = r.getSize(), rb = r.toBitmap();
    const overX = Math.max(0, rs.width - ss.width), overY = Math.max(0, rs.height - ss.height);
    const over = Math.max(overX, overY);
    if (over < 2) { anchorCache.set(key, 0.5); return 0.5; }
    const lum = (b, i) => b[i] * 0.11 + b[i + 1] * 0.59 + b[i + 2] * 0.3;
    const ls = new Float32Array(ss.width * ss.height), lr = new Float32Array(rs.width * rs.height);
    for (let i = 0; i < ls.length; i++) ls[i] = lum(sb, i * 4);
    for (let i = 0; i < lr.length; i++) lr[i] = lum(rb, i * 4);
    // Try every pixel offset along the cropped direction; the error is the mean of clipped differences, so icons,
    // windows and the rug itself (big differences) only count a little.
    const errs = [];
    for (let o = 0; o <= over; o++) {
      const ox = overX ? o : 0, oy = overY ? o : 0;
      let sum = 0, n = 0;
      for (let y = 0; y < ss.height; y += 3) for (let x = 0; x < ss.width; x += 3) {
        sum += Math.min(40, Math.abs(ls[y * ss.width + x] - lr[(y + oy) * rs.width + x + ox])); n++;
      }
      errs.push(sum / n);
    }
    let bi = 0; for (let i = 1; i < errs.length; i++) if (errs[i] < errs[bi]) bi = i;
    const bestErr = errs[bi];
    // Sub-pixel: fit a parabola through the best offset and its neighbours.
    let off = bi;
    if (bi > 0 && bi < errs.length - 1) {
      const a = errs[bi - 1], b = errs[bi], c = errs[bi + 1], den = a - 2 * b + c;
      if (den > 0) off = bi + 0.5 * (a - c) / den;
    }
    const best = off / over;
    const anchor = bestErr < 18 ? best : 0.5; // screen mostly covered (full-screen app)? keep the default
    if (bestErr < 18) anchorCache.set(key, anchor);
    return anchor;
  } catch (e) { console.error('wallpaper anchor failed:', e.message); return 0.5; }
}

async function sendWallpaper(force = false) {
  if (!win || win.isDestroyed()) return;
  try {
    const w = IS_MAC ? await readWallpaperMac() : process.platform === 'win32' ? await readWallpaperWin() : { src: null, mode: 'fill', color: 'rgb(0,0,0)' };
    const d = screen.getPrimaryDisplay();
    let mtime = 0;
    try { if (w.src) mtime = fs.statSync(w.src).mtimeMs; } catch {}
    const sig = JSON.stringify([w.src, mtime, w.mode, w.color, d.bounds, d.workArea, d.scaleFactor]);
    if (!force && sig === wallpaperSig) return;
    wallpaperSig = sig;
    const bytes = w.src ? fs.readFileSync(w.src) : null;
    const anchor = await measureWallpaperAnchor(w.src, w.mode, d);
    // Couldn't measure this time (e.g. a full-screen app covered the desktop): try again on the next check.
    if (process.platform === 'win32' && w.src && ['fill', 'span'].includes(w.mode) && !anchorCache.has(JSON.stringify([w.src, mtime, d.bounds]))) wallpaperSig = '';
    lastWallpaper = { src: w.src, mode: w.mode, bytes: bytes ? bytes.length : 0, anchor };
    send('wallpaper', { bytes, mode: w.mode, color: w.color, scale: d.scaleFactor, bounds: d.bounds, workArea: d.workArea, anchor });
  } catch (e) { console.error('wallpaper failed:', e.message); }
}

function send(cmd, arg) {
  if (win && !win.isDestroyed()) win.webContents.send('command', cmd, arg);
}

// ---------- rug commands (from panel, menus) ----------
// While the Invisible rug is out, notice wallpaper changes (slideshows, the user picking a new one).
setInterval(() => { if (rugState.style === 'gorunmez' && win && win.isVisible()) sendWallpaper(); }, 20000);

function rugCommand(cmd, arg) {
  if (!unlocked() && cmd !== 'hide') return;
  if (cmd === 'show') { userHidden = false; updateRugVisibility(); return; }
  if (cmd === 'hide') { userHidden = true; updateRugVisibility(); return; }
  if (cmd === 'style' && expiredPaid() && arg !== 'klasik') return;
  if (cmd === 'style' || cmd === 'size' || cmd === 'weight') rugState[cmd] = arg; // optimistic, renderer confirms
  if (cmd === 'style' && arg === 'gorunmez') sendWallpaper(true);
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
    app.setLoginItemSettings(IS_MAC ? { openAtLogin: !!value } : { openAtLogin: !!value, args: ['--autostart'] });
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
    if (IS_MAC) app.dock?.show();
    panel.show(); panel.focus();
    return;
  }
  if (IS_MAC) app.dock?.show();
  panel = new BrowserWindow({
    width: 460, height: Math.min(820, screen.getPrimaryDisplay().workArea.height - 40), minWidth: 420, minHeight: 560, show: false, title: 'Desktop Carpet',
    backgroundColor: '#c4925c', icon: path.join(__dirname, 'icon.png'), autoHideMenuBar: true,
    ...(IS_MAC
      ? { titleBarStyle: 'hidden', trafficLightPosition: { x: 14, y: 13 } }
      : { titleBarStyle: 'hidden', titleBarOverlay: { color: '#22130c', symbolColor: '#f2e6cc', height: 40 } }),
    webPreferences: { preload: path.join(__dirname, 'panel-preload.cjs'), contextIsolation: true, nodeIntegration: false, sandbox: true },
  });
  panel.setMenu(null);
  panel.loadFile(path.join(__dirname, '..', 'panel', 'index.html'));
  panel.once('ready-to-show', () => { panel.show(); panel.moveTop(); panel.focus(); });
  // macOS: the app lives in the menu bar; the Dock icon is only there while the panel is open.
  panel.on('closed', () => { panel = null; if (IS_MAC) app.dock?.hide(); });
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
    settings: { onTop: settings.onTop, langSetting: settings.lang || 'auto', openAtLogin: app.getLoginItemSettings(IS_MAC ? undefined : { args: ['--autostart'] }).openAtLogin },
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
      { label: t('pattern'), submenu: radio('style', ['tabriz', 'klasik', 'lacivert', 'zumrut', 'kilim', 'gorunmez', 'balkabagi', 'orumcek', 'hayalet']) },
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
const UPDATE_ASSET = IS_MAC ? 'DesktopCarpet-Mac.zip' : 'DesktopCarpet-Setup.exe';
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
    const file = path.join(app.getPath('temp'), IS_MAC ? `DesktopCarpet-Mac-${version}.zip` : `DesktopCarpet-Setup-${version}.exe`);
    const res = await fetch(asset.browser_download_url, { headers: { 'user-agent': 'DesktopCarpet/' + app.getVersion() } });
    if (!res.ok || !res.body) throw new Error('download ' + res.status);
    const hash = require('crypto').createHash('sha256');
    const out = fs.createWriteStream(file);
    let size = 0;
    for await (const chunk of res.body) { hash.update(chunk); size += chunk.length; if (!out.write(chunk)) await new Promise((ok) => out.once('drain', ok)); }
    await new Promise((ok, bad) => out.end((e) => (e ? bad(e) : ok())));
    const digest = 'sha256:' + hash.digest('hex');
    // GitHub's SHA-256 is required: an asset without one is never installed.
    if (size !== asset.size || !asset.digest || asset.digest !== digest) { fs.rmSync(file, { force: true }); throw new Error('bad download'); }
    // Once Desktop Carpet itself is code-signed, an update must carry a valid signature from the same publisher,
    // so even a release uploaded by someone else (e.g. a stolen GitHub account) is refused.
    const mine = await signerOf(process.execPath);
    if (mine && (await signerOf(file)) !== mine) { fs.rmSync(file, { force: true }); throw new Error('update not signed by ' + mine); }
    if (IS_MAC) {
      // Unpack the new Desktop Carpet.app next to the zip; it replaces the running one on restart.
      const dir = path.join(app.getPath('temp'), `DesktopCarpet-${version}`);
      fs.rmSync(dir, { recursive: true, force: true });
      await new Promise((ok, bad) => require('child_process').execFile('/usr/bin/ditto', ['-x', '-k', file, dir], (e) => (e ? bad(e) : ok())));
      fs.rmSync(file, { force: true });
      const appDir = path.join(dir, 'Desktop Carpet.app');
      if (!fs.existsSync(path.join(appDir, 'Contents', 'MacOS'))) throw new Error('bad mac update');
      update = { state: 'ready', version, file: appDir };
    } else {
      update = { state: 'ready', version, file };
    }
  } catch (e) {
    console.error('update check failed:', e.message);
    if (update.state === 'downloading') update = { state: 'idle' };
  }
  refreshMenus();
  broadcast();
}

// Subject of a valid Authenticode signature on a file, or '' when it is unsigned or the signature is bad.
function signerOf(file) {
  if (process.platform !== 'win32') return Promise.resolve('');
  const ps = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
  const script = "$s = Get-AuthenticodeSignature -LiteralPath $env:DC_SIGNED_FILE; if ($s.Status -eq 'Valid') { $s.SignerCertificate.Subject }";
  return new Promise((resolve) => {
    require('child_process').execFile(ps, ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { env: { ...process.env, DC_SIGNED_FILE: file }, windowsHide: true, timeout: 30000 },
      (err, stdout) => resolve(err ? '' : String(stdout).trim()));
  });
}

// The .app bundle we are running from, e.g. /Applications/Desktop Carpet.app (macOS only).
function currentAppBundle() {
  const p = path.resolve(path.dirname(process.execPath), '..', '..');
  return p.endsWith('.app') ? p : null;
}

function installUpdate() {
  if (update.state !== 'ready' || !fs.existsSync(update.file)) return;
  if (IS_MAC) {
    const target = currentAppBundle();
    let writable = false;
    try { fs.accessSync(path.dirname(target), fs.constants.W_OK); writable = !!target && !target.includes('/AppTranslocation/'); } catch {}
    if (!writable) { shell.openExternal(URLS.home); return; } // can't replace it in place: send them to the download
    // After we quit: swap the bundles (keeping the old one until the new one is in place), then start the new one.
    const script = 'while kill -0 "$1" 2>/dev/null; do sleep 0.2; done; ' +
      'mv "$2" "$2.old" && if mv "$3" "$2"; then rm -rf "$2.old"; xattr -dr com.apple.quarantine "$2" 2>/dev/null; else mv "$2.old" "$2"; fi; open "$2"';
    require('child_process').spawn('/bin/sh', ['-c', script, 'sh', String(process.pid), target, update.file], { detached: true, stdio: 'ignore' }).unref();
    app.quit();
    return;
  }
  // /S = silent NSIS install; the installer closes us, replaces the files and starts the new version.
  require('child_process').spawn(update.file, ['/S'], { detached: true, stdio: 'ignore' }).unref();
  app.quit();
}

// ---------- app lifecycle ----------
app.whenReady().then(() => {
  settings = { ...settings, ...readJson(SETTINGS_FILE(), {}) };
  if (IS_MAC) {
    try { const li = app.getLoginItemSettings(); if (li.wasOpenedAtLogin || li.wasOpenedAsHidden) AUTOSTART = true; } catch {}
    if (AUTOSTART) app.dock?.hide();
  }
  createRugWindow();

  tray = new Tray(path.join(__dirname, process.platform === 'win32' ? 'tray.ico' : IS_MAC ? 'trayTemplate.png' : 'tray.png'));
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

  setTimeout(() => { launchSettled = true; }, 1500);
  if (process.env.DC_SMOKE) runSmoke();
});

// Opening the app again (desktop shortcut, Start menu) brings up the panel and the rug.
app.on('second-instance', () => {
  openPanel();
  if (unlocked() && userHidden) { userHidden = false; updateRugVisibility(); }
});
// Closing the panel keeps the carpet running in the tray / menu bar.
app.on('window-all-closed', () => {});
// macOS: clicking the Dock icon (or opening the app again from Finder) brings up the panel.
// (macOS also sends 'activate' right at launch; that one is ignored so a login start stays quiet.)
let launchSettled = false;
app.on('activate', () => { if (launchSettled) openPanel(); });

// ---------- IPC: rug window ----------
ipcMain.on('ignore-mouse', (_e, ignore) => { if (win && !win.isDestroyed()) win.setIgnoreMouseEvents(!!ignore, { forward: true }); });
ipcMain.on('show-menu', () => {
  if (!win || !win.isVisible()) return;
  buildMenu().popup({ callback: () => setTimeout(() => send('reset-input'), 50) });
});
ipcMain.on('report-state', (_e, s) => {
  const wasInvisible = rugState.style === 'gorunmez';
  rugState = { ...rugState, style: s.style ?? rugState.style, size: s.size ?? rugState.size, weight: s.weight ?? rugState.weight };
  if (rugState.style === 'gorunmez' && !wasInvisible) sendWallpaper(true);
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
  fs.appendFileSync(path.join(out, 'smoke.txt'), `rugVisible ${win.isVisible()}\n`);
  await shot(panel, 'panel-active.png');
  await shot(win, 'rug.png');
  rugCommand('style', 'gorunmez');
  await wait(3500);
  console.log('SMOKE wallpaper', JSON.stringify(lastWallpaper));
  fs.appendFileSync(path.join(out, 'smoke.txt'), `wallpaper ${JSON.stringify(lastWallpaper)}\n`);
  await shot(win, 'rug-invisible.png');
  rugCommand('style', 'tabriz');
  await wait(800);
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
