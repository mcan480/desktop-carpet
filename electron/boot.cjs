// Desktop Carpet starts here. It runs the newest app update downloaded into the user's data folder when there is a
// good one for this installation, otherwise the app that was installed. Releases that only change the app (new rugs,
// fixes) reach people as a small download this way; a new Electron or a change to this file needs the full installer.
// This file is never replaced by an app update, so keep it small and careful.
//
// SHELL_REV: raise it whenever something outside the app archive changes in a way the app code depends on: this file,
// the installer, the Electron fuses, the packaged native modules. (Electron's and koffi's versions are part of the
// shell already.) An app update is only used by installations with exactly the same shell.
const SHELL_REV = 1;

const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const ofs = require('original-fs');   // reads and writes .asar files as plain files

function newer(a, b) {
  const pa = String(a).split('.').map((n) => parseInt(n, 10) || 0), pb = String(b).split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0);
  return false;
}
// (read as a file: koffi's package.json isn't one of its exports)
function koffiVersion() { try { return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'koffi', 'package.json'), 'utf8')).version; } catch { return '0'; } }
const readJson = (f, d) => { try { return JSON.parse(ofs.readFileSync(f, 'utf8')); } catch { return d; } };
const writeJson = (f, v) => { try { ofs.mkdirSync(path.dirname(f), { recursive: true }); ofs.writeFileSync(f, JSON.stringify(v)); } catch {} };

const SHELL = `e${process.versions.electron}-k${koffiVersion()}-s${SHELL_REV}`;
const BASE_VERSION = app.getVersion();
const DIR = () => path.join(app.getPath('userData'), 'updates');
const F = (name) => path.join(DIR(), name);

// What the app sees of all this (electron/main.cjs uses it to download and report updates).
global.dcBoot = {
  shell: SHELL,
  baseVersion: BASE_VERSION,
  patch: null,
  dir: DIR,
  // The app calls this once it's up and running: then this update is known to work and is never rolled back.
  ok() {
    if (!this.patch) return;
    writeJson(F('boot.json'), { version: this.patch.version, pending: false, tries: 0 });
  },
};

function markBad(version) {
  const bad = readJson(F('bad.json'), []);
  if (!bad.includes(version)) bad.push(version);
  writeJson(F('bad.json'), bad);
}

function removePatch(info) {
  try { if (info?.file) ofs.rmSync(F(info.file), { force: true }); } catch {}
  try { ofs.rmSync(F('patch.json'), { force: true }); } catch {}
}

// Launch test only: install the given app update as if it had just been downloaded.
function installSmokePatch(src) {
  try {
    const version = JSON.parse(fs.readFileSync(path.join(src, 'package.json'), 'utf8')).version;
    if (readJson(F('bad.json'), []).includes(version)) return;
    const file = `app-${version}.asar`;
    ofs.mkdirSync(DIR(), { recursive: true });
    ofs.copyFileSync(src, F(file));
    writeJson(F('patch.json'), { version, file, shell: SHELL, size: ofs.statSync(F(file)).size });
    console.log('SMOKE installed app update', version);
  } catch (e) { console.error('SMOKE could not install app update:', e.message); }
}

// Older downloads nothing will run again (none of them is open yet at this point).
function tidy(keep) {
  try { for (const f of ofs.readdirSync(DIR())) if ((/^app-.*\.asar$/.test(f) && f !== keep) || /^incoming-/.test(f)) ofs.rmSync(F(f), { force: true }); } catch {}
}

function pickPatch() {
  if (!app.isPackaged) return null;
  if (process.env.DC_SMOKE && process.env.DC_SMOKE_PATCH) installSmokePatch(process.env.DC_SMOKE_PATCH);
  const info = readJson(F('patch.json'), null);
  tidy(info?.file);
  if (!info || !info.version || !info.file) return null;
  const file = F(info.file);
  let size = -1;
  try { size = ofs.statSync(file).size; } catch {}
  // An update for another shell, one the installed app has caught up with, or a damaged file: not used, cleaned up.
  if (info.shell !== SHELL || !newer(info.version, BASE_VERSION) || size !== info.size) { removePatch(info); return null; }
  if (readJson(F('bad.json'), []).includes(info.version)) { removePatch(info); return null; }
  // Two starts in a row that never got as far as ok(): this update doesn't work here, go back to the installed app.
  const boot = readJson(F('boot.json'), {});
  const tries = boot.version === info.version && boot.pending ? (boot.tries || 0) + 1 : 1;
  if (tries > 2) { console.error('app update', info.version, 'did not start twice; using the installed app'); markBad(info.version); removePatch(info); return null; }
  writeJson(F('boot.json'), { version: info.version, pending: true, tries });
  return { version: info.version, file };
}

// A second copy only wakes up the running one (electron/main.cjs asks for the same lock and gets it again).
if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
} else {
  const patch = pickPatch();
  if (patch) {
    try {
      app.setVersion(patch.version);
      global.dcBoot.patch = patch;
      require(path.join(patch.file, 'electron', 'main.cjs'));
    } catch (e) {
      // It broke while starting: never try it again, and restart into the installed app.
      console.error('app update', patch.version, 'failed to start:', e);
      markBad(patch.version);
      removePatch({ file: path.basename(patch.file) });
      app.relaunch();
      app.exit(0);
    }
  } else {
    require('./main.cjs');
  }
}
