// Desktop Carpet: a cloth rug that lies on the Windows or macOS desktop, unlocked by a desktopcarpet.com license.
const { app, BrowserWindow, ipcMain, Menu, Tray, Notification, nativeImage, screen, shell, powerMonitor, desktopCapturer } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');

const IS_MAC = process.platform === 'darwin';
if (process.platform === 'win32') app.setAppUserModelId('com.desktopcarpet.app');
if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0); }

const SITE = 'https://desktopcarpet.com';
const URLS = { home: `${SITE}/`, pricing: `${SITE}/#pricing`, contact: `${SITE}/contact.html?topic=app`, mcan2: 'https://mcan2.com/' };
let AUTOSTART = process.argv.includes('--autostart');
const JUST_UPDATED = process.argv.includes('--dc-updated');   // restarted by "Restart and update"
let showUpdated = false;   // this is the first start of a newer version: say so
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

// koffi's native part ships with the installed app; an app update (electron/boot.cjs) doesn't carry it.
function requireKoffi() {
  try { return require('koffi'); } catch (e) { if (!app.isPackaged) throw e; }
  return require(path.join(process.resourcesPath, 'app.asar', 'node_modules', 'koffi'));
}

// ---------- strings (shared with the panel) ----------
const I18N = require('../panel/i18n.js');
I18N.setPlatform(process.platform);
const LANG = () => (settings.lang && settings.lang !== 'auto' && I18N.LANGS[settings.lang])
  ? settings.lang
  : I18N.pick([...(app.getPreferredSystemLanguages?.() || []), app.getLocale()]);
// Menu keys map onto the panel's strings.
const MENU_KEYS = { open: 'openApp', show: 'showRug', hide: 'hideRug', locked: 'lockedMenu',
  tabriz: 's_tabriz', klasik: 's_klasik', lacivert: 's_lacivert', zumrut: 's_zumrut', kilim: 's_kilim', gorunmez: 's_gorunmez', balkabagi: 's_balkabagi', orumcek: 's_orumcek', hayalet: 's_hayalet', yildizlar: 's_yildizlar', mesa: 's_mesa', yorgan: 's_yorgan', ekose: 's_ekose', kanyon: 's_kanyon', ambar: 's_ambar', yalniz: 's_yalniz', bizon: 's_bizon', kartpostal: 's_kartpostal', millipark: 's_millipark', beyzbol: 's_beyzbol', basketbol: 's_basketbol', diner: 's_diner', route66: 's_route66', akcaagac: 's_akcaagac', yaprak: 's_yaprak', kayalik: 's_kayalik', atlantik: 's_atlantik', geyik: 's_geyik', kazlar: 's_kazlar', dalgic: 's_dalgic', kanadakart: 's_kanadakart', hokey: 's_hokey', kuzeyisik: 's_kuzeyisik', fener: 's_fener', kutupayisi: 's_kutupayisi', sarape: 's_sarape', greca: 's_greca', cini: 's_cini', agave: 's_agave', kafatasi: 's_kafatasi', monark: 's_monark', jaguar: 's_jaguar', meksikakart: 's_meksikakart', piramit: 's_piramit', sokak: 's_sokak', trajinera: 's_trajinera', tulum: 's_tulum', heriz: 's_heriz', bahce: 's_bahce', av: 's_av', hayat: 's_hayat', buta: 's_buta', bahtiyari: 's_bahtiyari', gabbe: 's_gabbe', nain: 's_nain', vazo: 's_vazo', herati: 's_herati', kum: 's_kum', turkmen: 's_turkmen', usak: 's_usak', lotto: 's_lotto', bergama: 's_bergama', yagcibedir: 's_yagcibedir', selcuklu: 's_selcuklu', hereke: 's_hereke', iznik: 's_iznik', turkiyekart: 's_turkiyekart', kapadokya: 's_kapadokya', bogaz: 's_bogaz', pamukkale: 's_pamukkale', nazar: 's_nazar', bojagi: 's_bojagi', saekdong: 's_saekdong', seladon: 's_seladon', dancheong: 's_dancheong', hangeul: 's_hangeul', najeon: 's_najeon', sipjang: 's_sipjang', kaplan: 's_kaplan', hanok: 's_hanok', seul: 's_seul', korekart: 's_korekart', yeondeung: 's_yeondeung', bibimbap: 's_bibimbap', jeju: 's_jeju', seigaiha: 's_seigaiha', asanoha: 's_asanoha', boro: 's_boro', koi: 's_koi', byobu: 's_byobu', shibori: 's_shibori', zen: 's_zen', fuji: 's_fuji', kyoto: 's_kyoto', japonkart: 's_japonkart', buyukdalga: 's_buyukdalga', manekineko: 's_manekineko', torii: 's_torii', sushi: 's_sushi', porselen: 's_porselen', bulut: 's_bulut', artdeco: 's_artdeco', ningxia: 's_ningxia', bambu: 's_bambu', kagitkesim: 's_kagitkesim', imparator: 's_imparator', mahjong: 's_mahjong', panda: 's_panda', seddicin: 's_seddicin', cinkart: 's_cinkart', fenerfest: 's_fenerfest', guilin: 's_guilin', dimsum: 's_dimsum',
  majolika: 's_majolika', limon: 's_limon', damask: 's_damask', mozaik: 's_mozaik', floransa: 's_floransa', murano: 's_murano', makarna: 's_makarna', sicilya: 's_sicilya', venedik: 's_venedik', toskana: 's_toskana', cinqueterre: 's_cinqueterre', pizza: 's_pizza', italyakart: 's_italyakart', kolezyum: 's_kolezyum', gelato: 's_gelato', romasokak: 's_romasokak', menderes: 's_menderes', amfora: 's_amfora', zeytin: 's_zeytin', yunuslar: 's_yunuslar', bizans: 's_bizans', ahtapot: 's_ahtapot', skiros: 's_skiros', kirlangic: 's_kirlangic', santorini: 's_santorini', akropolis: 's_akropolis', liman: 's_liman', mikonos: 's_mikonos', yunankart: 's_yunankart', knossos: 's_knossos', mavikapi: 's_mavikapi', yunansalata: 's_yunansalata', azulejo: 's_azulejo', flamenko: 's_flamenko', manton: 's_manton', granada: 's_granada', trencadis: 's_trencadis', dantel: 's_dantel', gitar: 's_gitar', kastanyet: 's_kastanyet', elhamra: 's_elhamra', avlu: 's_avlu', paella: 's_paella', lamancha: 's_lamancha', ispanyakart: 's_ispanyakart', parkguell: 's_parkguell', tapas: 's_tapas', portakal: 's_portakal', provence: 's_provence', tomette: 's_tomette', cigale: 's_cigale', mimoza: 's_mimoza', toile: 's_toile', moustiers: 's_moustiers', lavanta: 's_lavanta', riviera: 's_riviera', aycicegi: 's_aycicegi', petank: 's_petank', pazar: 's_pazar', kalanka: 's_kalanka', fransakart: 's_fransakart', mavisandalye: 's_mavisandalye', roussillon: 's_roussillon', camargue: 's_camargue',
  selbu: 's_selbu', rosemaling: 's_rosemaling', hardanger: 's_hardanger', setesdal: 's_setesdal', somon: 's_somon', solje: 's_solje', fiyort: 's_fiyort', lofoten: 's_lofoten', bryggen: 's_bryggen', vikinggemisi: 's_vikinggemisi', vafler: 's_vafler', norvecart: 's_norvecart', dalahast: 's_dalahast', kurbits: 's_kurbits', lingon: 's_lingon', midsommar: 's_midsommar', skane: 's_skane', kraftor: 's_kraftor', stuga: 's_stuga', majstang: 's_majstang', skargard: 's_skargard', gamlastan: 's_gamlastan', fika: 's_fika', isveckart: 's_isveckart', kalpler: 's_kalpler', dugum: 's_dugum', moderne: 's_moderne', sild: 's_sild', kehribar: 's_kehribar', kugu: 's_kugu', nyhavn: 's_nyhavn', smorrebrod: 's_smorrebrod', wienerbrod: 's_wienerbrod', bisiklet: 's_bisiklet', monsklint: 's_monsklint', danimarkakart: 's_danimarkakart', ryijy: 's_ryijy', himmeli: 's_himmeli', tuohi: 's_tuohi', lakka: 's_lakka', karjala: 's_karjala', lumikide: 's_lumikide', binjarvi: 's_binjarvi', sauna: 's_sauna', laponya: 's_laponya', tramvay: 's_tramvay', piirakka: 's_piirakka', finlandiyakart: 's_finlandiyakart', lopapeysa: 's_lopapeysa', bazalt: 's_bazalt', lundi: 's_lundi', koyun: 's_koyun', lav: 's_lav', laufabraud: 's_laufabraud', gayzer: 's_gayzer', skogafoss: 's_skogafoss', karakum: 's_karakum', jokulsarlon: 's_jokulsarlon', reykjavik: 's_reykjavik', izlandakart: 's_izlandakart',
  licitar: 's_licitar', konavle: 's_konavle', dalmacyali: 's_dalmacyali', kravat: 's_kravat', sibenik: 's_sibenik', paglace: 's_paglace', dubrovnik: 's_dubrovnik', plitvice: 's_plitvice', zlatnirat: 's_zlatnirat', dolac: 's_dolac', kornati: 's_kornati', hirvatkart: 's_hirvatkart', bakir: 's_bakir', konjic: 's_konjic', zlatovez: 's_zlatovez', fildzan: 's_fildzan', grozd: 's_grozd', pita: 's_pita', starimost: 's_starimost', bascarsija: 's_bascarsija', jajce: 's_jajce', cevapi: 's_cevapi', lukomir: 's_lukomir', saraybosnakart: 's_saraybosnakart', sljiva: 's_sljiva', opanak: 's_opanak', venci: 's_venci', zlakusa: 's_zlakusa', kolo: 's_kolo', sumadija: 's_sumadija', kalemegdan: 's_kalemegdan', drina: 's_drina', derdap: 's_derdap', sargan: 's_sargan', zlatibor: 's_zlatibor', sirbistankart: 's_sirbistankart', troyan: 's_troyan', martenitsa: 's_martenitsa', trakya: 's_trakya', kukeri: 's_kukeri', gulyagi: 's_gulyagi', tryavna: 's_tryavna', gulvadisi: 's_gulvadisi', plovdiv: 's_plovdiv', yedigoller: 's_yedigoller', belogradcik: 's_belogradcik', yogurt: 's_yogurt', bulgaristankart: 's_bulgaristankart', xhubleta: 's_xhubleta', qeleshe: 's_qeleshe', cifteli: 's_cifteli', tascati: 's_tascati', incir: 's_incir', pelikan: 's_pelikan', gjirokaster: 's_gjirokaster', berat: 's_berat', mavigoz: 's_mavigoz', ksamil: 's_ksamil', theth: 's_theth', arnavutlukkart: 's_arnavutlukkart', kumsise: 's_kumsise', dallah: 's_dallah', karasusen: 's_karasusen', oriks: 's_oriks', bedevi: 's_bedevi', hurma: 's_hurma', petra: 's_petra', vadirum: 's_vadirum', oludeniz: 's_oludeniz', ceras: 's_ceras', akabe: 's_akabe', urdunkart: 's_urdunkart', zellij: 's_zellij', fasfener: 's_fasfener', babuc: 's_babuc', baharat: 's_baharat', tajin: 's_tajin', zouak: 's_zouak', sefsavan: 's_sefsavan', marakes: 's_marakes', sahra: 's_sahra', aitbenhaddou: 's_aitbenhaddou', fesboya: 's_fesboya', faskart: 's_faskart',
  kucuk: 'small', orta: 'medium', buyuk: 'large', hafif: 'light', normal: 'normal', agir: 'heavy' };
const t = (k) => { if (k === 'tip') return 'Desktop Carpet'; const v = I18N.strings(LANG())[MENU_KEYS[k] || k]; return typeof v === 'string' ? v.replace(/\u00ad/g, '') : k; }; // soft hyphens only help the panel's narrow tabs

// ---------- small persistence helpers ----------
function readJson(file, fallback) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
function writeJson(file, data) { try { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(data)); } catch (e) { console.error(e); } }

// ---------- keep the rug window just above the desktop icons, below app windows ----------
let user32 = null;
function loadUser32() {
  if (process.platform !== 'win32' || user32) return user32;
  try {
    const koffi = requireKoffi();
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
    const koffi = requireKoffi();
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
  win.once('ready-to-show', () => {
    rugReady = true; updateRugVisibility();
    global.dcBoot?.ok?.();   // this version starts fine: an app update is kept (electron/boot.cjs)
    if (showUpdated) closeSplash(2600);
  });
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
    const koffi = requireKoffi();
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
  checkForUpdate({ minGap: UPDATE_MIN_GAP });   // opening the app is when people expect it to be up to date
  if (panel && !panel.isDestroyed()) {
    if (panel.isMinimized()) panel.restore();
    if (IS_MAC) app.dock?.show();
    panel.show(); panel.focus();
    return;
  }
  if (IS_MAC) app.dock?.show();
  panel = new BrowserWindow({
    width: Math.min(1020, screen.getPrimaryDisplay().workArea.width - 60), height: Math.min(780, screen.getPrimaryDisplay().workArea.height - 40),
    minWidth: 440, minHeight: 560, show: false, title: 'Desktop Carpet',
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
    update: { state: installing ? 'installing' : update.state, version: update.version, progress: update.progress || 0, kind: update.kind, got: update.got || 0, total: update.total || 0, platform: process.platform },
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
  const items = [{ label: t('open'), click: openPanel }, { label: t('reportMenu'), click: openReport }];
  if (update.state === 'ready') items.push({ label: I18N.strings(LANG()).updMenu(update.version), click: installUpdate });
  items.push({ type: 'separator' });
  if (unlocked()) {
    items.push(
      { label: t('flatten'), click: () => rugCommand('flatten') },
      { label: t('center'), click: () => rugCommand('center') },
      userHidden ? { label: t('show'), click: () => rugCommand('show') } : { label: t('hide'), click: () => rugCommand('hide') },
      { type: 'separator' },
      { label: t('pattern'), submenu: [
        ...radio('style', ['tabriz', 'klasik', 'lacivert', 'zumrut', 'kilim', 'gorunmez']),
        { type: 'separator' },
        // the newest packs first, marked new
        { label: `${t('balkans')} · ${t('newBadge')}`, submenu: [
          { label: t('croatia'), submenu: [...radio('style', ['licitar', 'konavle', 'dalmacyali', 'kravat', 'sibenik', 'paglace']), { type: 'separator' }, ...radio('style', ['dubrovnik', 'plitvice', 'zlatnirat', 'dolac', 'kornati', 'hirvatkart'])] },
          { label: t('bosnia'), submenu: [...radio('style', ['bakir', 'konjic', 'zlatovez', 'fildzan', 'grozd', 'pita']), { type: 'separator' }, ...radio('style', ['starimost', 'bascarsija', 'jajce', 'cevapi', 'lukomir', 'saraybosnakart'])] },
          { label: t('serbia'), submenu: [...radio('style', ['sljiva', 'opanak', 'venci', 'zlakusa', 'kolo', 'sumadija']), { type: 'separator' }, ...radio('style', ['kalemegdan', 'drina', 'derdap', 'sargan', 'zlatibor', 'sirbistankart'])] },
          { label: t('bulgaria'), submenu: [...radio('style', ['troyan', 'martenitsa', 'trakya', 'kukeri', 'gulyagi', 'tryavna']), { type: 'separator' }, ...radio('style', ['gulvadisi', 'plovdiv', 'yedigoller', 'belogradcik', 'yogurt', 'bulgaristankart'])] },
          { label: t('albania'), submenu: [...radio('style', ['xhubleta', 'qeleshe', 'cifteli', 'tascati', 'incir', 'pelikan']), { type: 'separator' }, ...radio('style', ['gjirokaster', 'berat', 'mavigoz', 'ksamil', 'theth', 'arnavutlukkart'])] },
        ] },
        { label: `${t('jordan')} · ${t('newBadge')}`, submenu: [...radio('style', ['kumsise', 'dallah', 'karasusen', 'oriks', 'bedevi', 'hurma']), { type: 'separator' }, ...radio('style', ['petra', 'vadirum', 'oludeniz', 'ceras', 'akabe', 'urdunkart'])] },
        { label: `${t('morocco')} · ${t('newBadge')}`, submenu: [...radio('style', ['zellij', 'fasfener', 'babuc', 'baharat', 'tajin', 'zouak']), { type: 'separator' }, ...radio('style', ['sefsavan', 'marakes', 'sahra', 'aitbenhaddou', 'fesboya', 'faskart'])] },
        { label: t('nordic'), submenu: [
          { label: t('norway'), submenu: [...radio('style', ['selbu', 'rosemaling', 'hardanger', 'setesdal', 'somon', 'solje']), { type: 'separator' }, ...radio('style', ['fiyort', 'lofoten', 'bryggen', 'vikinggemisi', 'vafler', 'norvecart'])] },
          { label: t('sweden'), submenu: [...radio('style', ['dalahast', 'kurbits', 'lingon', 'midsommar', 'skane', 'kraftor']), { type: 'separator' }, ...radio('style', ['stuga', 'majstang', 'skargard', 'gamlastan', 'fika', 'isveckart'])] },
          { label: t('denmark'), submenu: [...radio('style', ['kalpler', 'dugum', 'moderne', 'sild', 'kehribar', 'kugu']), { type: 'separator' }, ...radio('style', ['nyhavn', 'smorrebrod', 'wienerbrod', 'bisiklet', 'monsklint', 'danimarkakart'])] },
          { label: t('finland'), submenu: [...radio('style', ['ryijy', 'himmeli', 'tuohi', 'lakka', 'karjala', 'lumikide']), { type: 'separator' }, ...radio('style', ['binjarvi', 'sauna', 'laponya', 'tramvay', 'piirakka', 'finlandiyakart'])] },
          { label: t('iceland'), submenu: [...radio('style', ['lopapeysa', 'bazalt', 'lundi', 'koyun', 'lav', 'laufabraud']), { type: 'separator' }, ...radio('style', ['gayzer', 'skogafoss', 'karakum', 'jokulsarlon', 'reykjavik', 'izlandakart'])] },
        ] },
        { label: t('mediterranean'), submenu: [
          { label: t('italy'), submenu: [...radio('style', ['majolika', 'limon', 'damask', 'mozaik', 'floransa', 'murano', 'makarna', 'sicilya']), { type: 'separator' }, ...radio('style', ['venedik', 'toskana', 'cinqueterre', 'pizza', 'italyakart', 'kolezyum', 'gelato', 'romasokak'])] },
          { label: t('greece'), submenu: [...radio('style', ['menderes', 'amfora', 'zeytin', 'yunuslar', 'bizans', 'ahtapot', 'skiros', 'kirlangic']), { type: 'separator' }, ...radio('style', ['santorini', 'akropolis', 'liman', 'mikonos', 'yunankart', 'knossos', 'mavikapi', 'yunansalata'])] },
          { label: t('spain'), submenu: [...radio('style', ['azulejo', 'flamenko', 'manton', 'granada', 'trencadis', 'dantel', 'gitar', 'kastanyet']), { type: 'separator' }, ...radio('style', ['elhamra', 'avlu', 'paella', 'lamancha', 'ispanyakart', 'parkguell', 'tapas', 'portakal'])] },
          { label: t('france'), submenu: [...radio('style', ['provence', 'tomette', 'cigale', 'mimoza', 'toile', 'moustiers']), { type: 'separator' }, ...radio('style', ['lavanta', 'riviera', 'aycicegi', 'petank', 'pazar', 'kalanka', 'fransakart', 'mavisandalye', 'roussillon', 'camargue'])] },
        ] },
        { label: t('halloween'), submenu: radio('style', ['balkabagi', 'orumcek', 'hayalet']) },
        { label: t('americas'), submenu: [
          { label: t('usa'), submenu: radio('style', ['yildizlar', 'mesa', 'yorgan', 'ekose', 'kanyon', 'ambar', 'yalniz', 'bizon', 'kartpostal', 'millipark', 'beyzbol', 'basketbol', 'diner', 'route66']) },
          { label: t('canada'), submenu: radio('style', ['akcaagac', 'yaprak', 'kayalik', 'atlantik', 'geyik', 'kazlar', 'dalgic', 'kanadakart', 'hokey', 'kuzeyisik', 'fener', 'kutupayisi']) },
          { label: t('mexico'), submenu: radio('style', ['sarape', 'greca', 'cini', 'agave', 'kafatasi', 'monark', 'jaguar', 'meksikakart', 'piramit', 'sokak', 'trajinera', 'tulum']) },
        ] },
        { label: t('persia'), submenu: radio('style', ['heriz', 'bahce', 'av', 'hayat', 'buta', 'bahtiyari', 'gabbe', 'nain', 'vazo', 'herati', 'kum', 'turkmen']) },
        { label: t('turkiye'), submenu: [
          ...radio('style', ['usak', 'lotto', 'bergama', 'yagcibedir', 'selcuklu', 'hereke', 'iznik']),
          { type: 'separator' },
          ...radio('style', ['turkiyekart', 'kapadokya', 'bogaz', 'pamukkale', 'nazar']),
        ] },
        { label: t('eastAsia'), submenu: [
          { label: t('korea'), submenu: radio('style', ['bojagi', 'saekdong', 'seladon', 'dancheong', 'hangeul', 'najeon', 'sipjang', 'kaplan', 'hanok', 'seul', 'korekart', 'yeondeung', 'bibimbap', 'jeju']) },
          { label: t('japan'), submenu: radio('style', ['seigaiha', 'asanoha', 'boro', 'koi', 'byobu', 'shibori', 'zen', 'fuji', 'kyoto', 'japonkart', 'buyukdalga', 'manekineko', 'torii', 'sushi']) },
          { label: t('china'), submenu: radio('style', ['porselen', 'bulut', 'artdeco', 'ningxia', 'bambu', 'kagitkesim', 'imparator', 'mahjong', 'panda', 'seddicin', 'cinkart', 'fenerfest', 'guilin', 'dimsum']) },
        ] },
      ] },
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
// The newest release on github.com/mcan480/desktop-carpet is checked: as soon as the app starts (retrying while the
// network comes up after a login start), every time the app is opened again or the panel is opened (at most every few
// minutes), after the computer wakes, and every 6 hours.
// Two kinds of update:
//  - app update: when the release was built for the same Electron as this installation (see electron/boot.cjs), only
//    the app itself is downloaded (DesktopCarpet-Patch-<shell>.asar.br, a few MB) into the user's data folder; the
//    next start runs it. Restarting is all "Restart and update" has to do.
//  - full update: otherwise the installer (Windows) or the app (Mac, for this processor if there is one) is
//    downloaded and installed on "Restart and update".
// Everything downloaded is checked against the size and SHA-256 GitHub reports for it.
const UPDATE_API = 'https://api.github.com/repos/mcan480/desktop-carpet/releases/latest';
const UPDATE_MIN_GAP = 5 * 60 * 1000;   // opening the panel again within this time doesn't ask GitHub again
const ofs = require('original-fs');     // .asar files written and moved as plain files
const zlib = require('zlib');
const { Readable, Transform } = require('stream');
const { pipeline } = require('stream/promises');
let update = { state: 'idle' };   // idle | downloading | ready  (+ version, kind: 'app' | 'full', got/total bytes, file)
let updateRun = null;             // the check in progress, so two triggers never run side by side
let lastUpdateCheck = 0;          // when GitHub last answered
let updateNotified = '';          // version the user was already told about outside the panel
let updateNote = null;            // keeps the macOS notification alive so its click still arrives
let installing = false;

function newer(a, b) {
  const pa = String(a).split('.').map((n) => parseInt(n, 10) || 0), pb = String(b).split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) { if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0); }
  return false;
}

// Resolves to true when GitHub was reached and the app is up to date or the update is ready, false when it should be retried.
function checkForUpdate({ minGap = 0 } = {}) {
  if (!app.isPackaged) return Promise.resolve(true);
  if (updateRun) return updateRun;
  if (minGap && Date.now() - lastUpdateCheck < minGap) return Promise.resolve(true);
  updateRun = runUpdateCheck().finally(() => { updateRun = null; });
  return updateRun;
}

// At launch (also when Windows/macOS starts the app at login, when the network may not be up yet):
// check right away, and if GitHub can't be reached try again after 30 s, 2 min and 10 min.
function checkForUpdateAtLaunch(attempt = 0) {
  const waits = [30 * 1000, 2 * 60 * 1000, 10 * 60 * 1000];
  checkForUpdate().then((ok) => { if (!ok && attempt < waits.length) setTimeout(() => checkForUpdateAtLaunch(attempt + 1), waits[attempt]); });
}

function sha256File(file) {
  return new Promise((ok, bad) => {
    const hash = require('crypto').createHash('sha256');
    ofs.createReadStream(file).on('data', (c) => hash.update(c)).on('error', bad).on('end', () => ok('sha256:' + hash.digest('hex')));
  });
}

// Downloads a release asset through `then` (a stream the bytes are piped into after counting and hashing them),
// reporting progress; throws unless exactly the published bytes arrived.
async function downloadAsset(asset, version, kind, ...then) {
  update = { state: 'downloading', version, kind, progress: 0, got: 0, total: asset.size };
  broadcast();
  // (a stalled download is given up after 20 minutes so it can't block later checks)
  const res = await fetch(asset.browser_download_url, { headers: { 'user-agent': 'DesktopCarpet/' + app.getVersion() }, signal: AbortSignal.timeout(20 * 60 * 1000) });
  if (!res.ok || !res.body) throw new Error('download ' + res.status);
  const hash = require('crypto').createHash('sha256');
  let got = 0, shown = 0;
  const count = new Transform({
    transform(chunk, _enc, done) {
      hash.update(chunk); got += chunk.length;
      const progress = Math.min(99, Math.floor((got / (asset.size || 1)) * 100));
      if (progress !== update.progress || got - shown > 512 * 1024) { shown = got; update.progress = progress; update.got = got; broadcast(); }
      done(null, chunk);
    },
  });
  await pipeline(Readable.fromWeb(res.body), count, ...then);
  if (got !== asset.size || asset.digest !== 'sha256:' + hash.digest('hex')) throw new Error('bad download');
}

// An app update can be used here: the installation knows its shell (electron/boot.cjs) and, when Desktop Carpet is
// code-signed, nothing unsigned is ever run (a signed app only takes signed full installers).
let mySigner = null;
async function appUpdatesAllowed() {
  if (!global.dcBoot?.shell) return false;
  if (mySigner === null) mySigner = await signerOf(process.execPath);
  return !mySigner;
}

async function runUpdateCheck() {
  let ok = false;
  try {
    const r = await fetch(UPDATE_API, { headers: { accept: 'application/vnd.github+json', 'user-agent': 'DesktopCarpet/' + app.getVersion() }, signal: AbortSignal.timeout(15000) });
    if (!r.ok) throw new Error('github ' + r.status);
    lastUpdateCheck = Date.now();
    const rel = await r.json();
    const version = String(rel.tag_name || '').replace(/^v/i, '');
    ok = true;
    if (rel.draft || rel.prerelease || !newer(version, app.getVersion())) return ok;
    if (update.state === 'ready' && update.version === version) return ok;
    const assets = rel.assets || [];
    // GitHub's SHA-256 is required: an asset without one is never used.
    const find = (name) => assets.find((a) => a.name === name && a.digest);

    const patch = (await appUpdatesAllowed()) && find(`DesktopCarpet-Patch-${global.dcBoot.shell}.asar.br`);
    if (patch) {
      ok = false;
      await getAppUpdate(patch, version);
      update = { state: 'ready', version, kind: 'app', total: patch.size };
      ok = true;
    } else {
      const asset = IS_MAC ? find(`DesktopCarpet-Mac-${process.arch}.zip`) || find('DesktopCarpet-Mac.zip') : find('DesktopCarpet-Setup.exe');
      if (!asset) return ok;
      ok = false;
      update = { state: 'ready', version, kind: 'full', total: asset.size, file: await getFullUpdate(asset, version) };
      ok = true;
    }
    notifyUpdateReady();
  } catch (e) {
    console.error('update check failed:', e.message);
    if (update.state === 'downloading') update = { state: 'idle' };
  }
  refreshMenus();
  broadcast();
  return ok;
}

// App update: unpacked into the updates folder, checked, then named in patch.json so the next start runs it.
async function getAppUpdate(asset, version) {
  const dir = global.dcBoot.dir();
  const name = `app-${version}.asar`, file = path.join(dir, name);
  const info = readJson(path.join(dir, 'patch.json'), {});
  let have = false;
  try { have = info.version === version && info.file === name && ofs.statSync(file).size === info.size; } catch {}
  if (have) return;
  ofs.mkdirSync(dir, { recursive: true });
  const tmp = path.join(dir, `incoming-${version}.part`);
  try {
    await downloadAsset(asset, version, 'app', zlib.createBrotliDecompress(), ofs.createWriteStream(tmp));
    // It must really be this version of Desktop Carpet before anything is switched over.
    const pkg = JSON.parse(readFromAsar(tmp, 'package.json') || '{}');
    if (pkg.version !== version || readFromAsar(tmp, 'electron/main.cjs') == null) throw new Error('bad app update');
    ofs.renameSync(tmp, file);
  } finally { try { ofs.rmSync(tmp, { force: true }); } catch {} }
  writeJson(path.join(dir, 'patch.json'), { version, file: name, shell: global.dcBoot.shell, size: ofs.statSync(file).size });
  // Earlier downloads are no longer needed (the one running now goes the next time the app starts).
  for (const f of ofs.readdirSync(dir)) if (/^app-.*\.asar$/.test(f) && f !== name && f !== path.basename(global.dcBoot.patch?.file || '')) { try { ofs.rmSync(path.join(dir, f), { force: true }); } catch {} }
}

// One file out of an .asar archive, read as plain bytes (so Electron never opens the archive and holds on to it):
// a pickled header (JSON listing every file with its offset and size) followed by the files' data.
function readFromAsar(archive, inner) {
  const fd = ofs.openSync(archive, 'r');
  try {
    const head = Buffer.alloc(16);
    ofs.readSync(fd, head, 0, 16, 0);
    const headerSize = head.readUInt32LE(4), jsonSize = head.readUInt32LE(12);
    if (jsonSize > 32 * 1024 * 1024) return null;
    const json = Buffer.alloc(jsonSize);
    ofs.readSync(fd, json, 0, jsonSize, 16);
    let node = JSON.parse(json.toString('utf8'));
    for (const part of inner.split('/')) { node = node?.files?.[part]; if (!node) return null; }
    if (node.unpacked || node.size == null || node.offset == null) return null;
    const data = Buffer.alloc(node.size);
    ofs.readSync(fd, data, 0, node.size, 8 + headerSize + Number(node.offset));
    return data.toString('utf8');
  } catch { return null; } finally { ofs.closeSync(fd); }
}

// Full update: the installer (Windows) or the app (Mac) in the temp folder.
async function getFullUpdate(asset, version) {
  const file = path.join(app.getPath('temp'), IS_MAC ? `DesktopCarpet-Mac-${version}.zip` : `DesktopCarpet-Setup-${version}.exe`);
  // Downloaded on an earlier run but not installed yet: use it again if it is still exactly the released file.
  let have = false;
  try { have = ofs.statSync(file).size === asset.size && (await sha256File(file)) === asset.digest; } catch {}
  if (!have) {
    try { await downloadAsset(asset, version, 'full', ofs.createWriteStream(file)); }
    catch (e) { ofs.rmSync(file, { force: true }); throw e; }
  }
  // Once Desktop Carpet itself is code-signed, an update must carry a valid signature from the same publisher,
  // so even a release uploaded by someone else (e.g. a stolen GitHub account) is refused.
  const mine = await signerOf(process.execPath);
  if (mine && (await signerOf(file)) !== mine) { ofs.rmSync(file, { force: true }); throw new Error('update not signed by ' + mine); }
  if (!IS_MAC) return file;
  // Unpack the new Desktop Carpet.app next to the zip; it replaces the running one on restart.
  const dir = path.join(app.getPath('temp'), `DesktopCarpet-${version}`);
  fs.rmSync(dir, { recursive: true, force: true });
  await new Promise((done, bad) => require('child_process').execFile('/usr/bin/ditto', ['-x', '-k', file, dir], (e) => (e ? bad(e) : done())));
  // (the zip stays in the temp folder, so a later start can unpack it again without downloading)
  const appDir = path.join(dir, 'Desktop Carpet.app');
  if (!fs.existsSync(path.join(appDir, 'Contents', 'MacOS'))) throw new Error('bad mac update');
  return appDir;
}

// The panel shows the update card; when the panel isn't on screen (e.g. the app started with the computer)
// the user gets one notification per version instead. Clicking it restarts into the new version.
function notifyUpdateReady() {
  if (update.state !== 'ready' || updateNotified === update.version) return;
  if (panel && !panel.isDestroyed() && panel.isVisible() && !panel.isMinimized()) return;
  updateNotified = update.version;
  const S = I18N.strings(LANG());
  try {
    if (process.platform === 'win32' && tray) {
      // A tray balloon shows as a normal Windows notification and needs no Start-menu registration.
      tray.displayBalloon({ title: S.updReady(update.version), content: S.updClick, iconType: 'info' });
    } else if (Notification.isSupported()) {
      updateNote = new Notification({ title: S.updReady(update.version), body: S.updClick, silent: true });
      updateNote.on('click', installUpdate);
      updateNote.show();
    }
  } catch (e) { console.error('update notification failed:', e.message); }
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

// The small "updating" window: a rug being woven while the update goes in, and a finished one once the new version
// is up (mode 'done'). It never takes focus.
let splash = null;
function showSplash(mode, version) {
  try {
    if (splash && !splash.isDestroyed()) splash.destroy();
    const { x, y, width, height } = screen.getPrimaryDisplay().workArea;
    const w = 380, h = 250;
    splash = new BrowserWindow({
      x: Math.round(x + (width - w) / 2), y: Math.round(y + (height - h) / 2), width: w, height: h,
      frame: false, transparent: true, backgroundColor: '#00000000', resizable: false, movable: false, minimizable: false, maximizable: false,
      fullscreenable: false, skipTaskbar: true, focusable: false, alwaysOnTop: true, hasShadow: false, show: false,
      webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true },
    });
    splash.setIgnoreMouseEvents(true);
    splash.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    splash.webContents.on('will-navigate', (e) => e.preventDefault());
    splash.loadFile(path.join(__dirname, '..', 'panel', 'splash.html'), { query: { mode, v: String(version || ''), lang: LANG() } });
    splash.once('ready-to-show', () => { if (splash && !splash.isDestroyed()) splash.showInactive(); });
    splash.on('closed', () => { splash = null; });
  } catch (e) { console.error('splash failed:', e.message); }
}
function closeSplash(after = 0) {
  const w = splash;   // this window, not whichever one is showing by then
  setTimeout(() => {
    if (!w || w.isDestroyed()) return;
    w.webContents.executeJavaScript("document.getElementById('card').classList.add('leaving')").catch(() => {});
    setTimeout(() => { if (!w.isDestroyed()) w.close(); }, 450);
  }, after);
}

function installUpdate() {
  if (update.state !== 'ready' || installing) return;
  if (update.kind === 'full' && !fs.existsSync(update.file)) return;
  const relaunchArgs = process.argv.slice(1).filter((a) => !['--autostart', '--dc-updated'].includes(a)).concat('--dc-updated');
  if (update.kind === 'app') {
    // The new app is already in place (electron/boot.cjs runs it): restart.
    installing = true; broadcast(); showSplash('installing', update.version);
    setTimeout(() => { app.relaunch({ args: relaunchArgs }); app.quit(); }, 1100);
    return;
  }
  if (IS_MAC) {
    const target = currentAppBundle();
    let writable = false;
    try { fs.accessSync(path.dirname(target), fs.constants.W_OK); writable = !!target && !target.includes('/AppTranslocation/'); } catch {}
    if (!writable) { shell.openExternal(URLS.home); return; } // can't replace it in place: send them to the download
    installing = true; broadcast(); showSplash('installing', update.version);
    // After we quit: swap the bundles (keeping the old one until the new one is in place), then start the new one.
    const script = 'while kill -0 "$1" 2>/dev/null; do sleep 0.2; done; ' +
      'mv "$2" "$2.old" && if mv "$3" "$2"; then rm -rf "$2.old"; xattr -dr com.apple.quarantine "$2" 2>/dev/null; else mv "$2.old" "$2"; fi; open "$2" --args --dc-updated';
    setTimeout(() => {
      require('child_process').spawn('/bin/sh', ['-c', script, 'sh', String(process.pid), target, update.file], { detached: true, stdio: 'ignore' }).unref();
      app.quit();
    }, 900);
    return;
  }
  // Windows: the installer shows its own progress (/UPDATE: no questions, closes when done) and starts the new version.
  installing = true; broadcast(); showSplash('installing', update.version);
  setTimeout(() => {
    require('child_process').spawn(update.file, ['/UPDATE'], { detached: true, stdio: 'ignore' }).unref();
    app.quit();
  }, 900);
}

// ---------- app lifecycle ----------
app.whenReady().then(() => {
  settings = { ...settings, ...readJson(SETTINGS_FILE(), {}) };
  if (IS_MAC) {
    try { const li = app.getLoginItemSettings(); if (li.wasOpenedAtLogin || li.wasOpenedAsHidden) AUTOSTART = true; } catch {}
    if (AUTOSTART) app.dock?.hide();
  }
  // The first start of a newer version (after "Restart and update", or an update that went in by itself) says so.
  showUpdated = JUST_UPDATED || (!!settings.lastVersion && newer(app.getVersion(), settings.lastVersion));
  if (settings.lastVersion !== app.getVersion()) { settings.lastVersion = app.getVersion(); writeJson(SETTINGS_FILE(), settings); }
  if (showUpdated) { showSplash('done', app.getVersion()); closeSplash(9000); }
  createRugWindow();

  tray = new Tray(path.join(__dirname, process.platform === 'win32' ? 'tray.ico' : IS_MAC ? 'trayTemplate.png' : 'tray.png'));
  tray.setToolTip(t('tip'));
  tray.on('click', openPanel);
  tray.on('balloon-click', installUpdate);   // the "update ready" notification on Windows
  refreshMenus();

  if (!AUTOSTART) openPanel();
  initLicense();
  checkForUpdateAtLaunch();
  setInterval(() => checkForUpdate(), 6 * 3600 * 1000);
  powerMonitor.on('resume', () => setTimeout(() => checkForUpdate({ minGap: UPDATE_MIN_GAP }), 10 * 1000));

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
ipcMain.on('panel-ready', () => {
  broadcast();
  if (wantReport && panel && !panel.isDestroyed()) { wantReport = false; panel.webContents.send('open-report'); }
});
// Tray "Report a problem…": open the panel with the report form showing.
let wantReport = false;
function openReport() {
  const fresh = !(panel && !panel.isDestroyed());
  openPanel();
  if (fresh) wantReport = true; else panel.webContents.send('open-report');
}
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
ipcMain.on('open-url', (_e, which) => {
  if (which === 'contact') { const u = new URL(URLS.contact); if (license?.key) u.searchParams.set('ref', license.key); shell.openExternal(u.toString()); return; }
  if (URLS[which]) shell.openExternal(URLS[which]);
});
// Report a problem: posted to the contact inbox on the site (the same one as its contact form), with what we need
// to help: app version, system, screen, the rug in use and the license key.
ipcMain.handle('report', async (_e, r) => {
  const email = String(r?.email || '').trim().slice(0, 254), text = String(r?.message || '').trim().slice(0, 3500);
  const d = screen.getPrimaryDisplay();
  const sys = IS_MAC ? `macOS ${process.getSystemVersion()}` : `Windows ${os.release()}`;
  const diag = [`Desktop Carpet ${app.getVersion()}`, `${sys} ${process.arch}`,
    `${screen.getAllDisplays().length} screen(s), ${d.size.width}x${d.size.height} @${d.scaleFactor}x`,
    `rug ${rugState.style} / ${rugState.size} / ${rugState.weight}`, `lang ${LANG()}`,
    `license ${license?.state || '?'}${license?.plan ? ' ' + license.plan : ''}`].join(' · ');
  const body = { email, topic: 'app', message: `${text}\n\n— ${diag}`, page: `app ${app.getVersion()} ${process.platform}`, t: Math.max(0, Number(r?.t) || 0),
    ...(license?.key ? { ref: String(license.key).slice(0, 60) } : {}) };
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 12000);
  try {
    const res = await fetch(`${SITE}/api/contact`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: ctl.signal });
    const j = await res.json().catch(() => ({}));
    return res.ok && j.ok ? { ok: true } : { ok: false, error: j.error || 'failed' };
  } catch { return { ok: false, error: 'network' }; } finally { clearTimeout(timer); }
});
ipcMain.on('quit', () => app.quit());
ipcMain.on('install-update', () => installUpdate());

// ---------- automated smoke test (DC_SMOKE=<out dir>) ----------
async function runSmoke() {
  const out = process.env.DC_SMOKE;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const shot = async (w, name) => { if (w && !w.isDestroyed()) fs.writeFileSync(path.join(out, name), (await w.webContents.capturePage()).toPNG()); };
  if (process.env.DC_LANG) { settings.lang = process.env.DC_LANG; refreshMenus(); }
  await wait(6000);
  // which app is running: the installed one, or an app update (electron/boot.cjs)
  fs.appendFileSync(path.join(out, 'smoke.txt'), `version ${app.getVersion()} patch ${global.dcBoot?.patch?.version || 'none'} shell ${global.dcBoot?.shell || '?'}\n`);
  console.log('SMOKE version', app.getVersion(), 'patch', global.dcBoot?.patch?.version || 'none');
  if (process.platform !== 'linux') { let k = 'ok'; try { requireKoffi(); } catch (e) { k = 'failed ' + e.message; } fs.appendFileSync(path.join(out, 'smoke.txt'), `koffi ${k}\n`); }
  update = { state: 'downloading', version: '1.0.2', kind: 'app', progress: 42, got: 3.4e6, total: 8.1e6 }; broadcast();
  await wait(400);
  await shot(panel, 'panel-updating.png');
  update = { state: 'ready', version: '1.0.2', kind: 'app', total: 8.1e6 }; broadcast();
  await wait(500);
  await shot(panel, 'panel-update-ready.png');
  showSplash('installing', '1.0.2');
  await wait(2200);
  await shot(splash, 'splash-installing.png');
  showSplash('done', '1.0.2');
  await wait(1800);
  await shot(splash, 'splash-done.png');
  closeSplash();
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
  // every rug is in the gallery, and the search finds them
  const gallery = await panel.webContents.executeJavaScript(`(() => {
    const rugs = new Set([...document.querySelectorAll('#swatches [data-style]')].map((b) => b.dataset.style)).size;
    const f = document.querySelector('#findInput'); f.value = 'greece'; f.dispatchEvent(new Event('input'));
    const hits = document.querySelectorAll('#resultsGrid button').length;
    f.value = ''; f.dispatchEvent(new Event('input'));
    return 'rugs ' + rugs + ' search ' + hits;
  })()`).catch((e) => 'error ' + e.message);
  fs.appendFileSync(path.join(out, 'smoke.txt'), `gallery ${gallery}\n`);
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
