// Build: package the Electron app for Windows x64, brand the exe, then make an NSIS installer.
const { packager } = require('@electron/packager');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

(async () => {
  require('esbuild').buildSync({ entryPoints: ['app/main.js'], bundle: true, format: 'iife', minify: true, outfile: 'app/bundle.js' });
  const [out] = await packager({
    dir: '.', name: 'Desktop Carpet', executableName: 'DesktopCarpet', platform: 'win32', arch: 'x64',
    electronVersion: '44.7.0', out: 'dist', overwrite: true, prune: true,
    asar: { unpack: '**/*.node' }, appVersion: pkg.version, appCopyright: 'Desktop Carpet',
    ignore: [/^\/dist/, /^\/build\.cjs/, /^\/pack\.cjs/, /^\/installer/, /^\/app\/(main|cloth|rugTexture)\.js$/, /^\/app\/vendor/,
             /node_modules\/(three|esbuild|@esbuild|resedit|pe-library|@fontsource)/,
             /node_modules\/@koromix\/koffi-(linux|darwin|freebsd|openbsd|win32-(ia32|arm64))/],
  });
  // Trim Chromium locales we don't need.
  const loc = path.join(out, 'locales');
  for (const f of fs.readdirSync(loc)) if (!['en-US.pak', 'tr.pak'].includes(f)) fs.rmSync(path.join(loc, f));

  // Brand the exe: icon + version info (pure JS, no wine).
  const ResEdit = await import('resedit');
  const PE = await import('pe-library');
  const exePath = path.join(out, 'DesktopCarpet.exe');
  const exe = PE.NtExecutable.from(fs.readFileSync(exePath), { ignoreCert: true });
  const res = PE.NtExecutableResource.from(exe);
  const ico = ResEdit.Data.IconFile.from(fs.readFileSync('electron/icon.ico'));
  const groups = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);
  const gid = groups.length ? groups[0].id : 1, glang = groups.length ? groups[0].lang : 1033;
  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries, gid, glang, ico.icons.map((i) => i.data));
  const vi = ResEdit.Resource.VersionInfo.fromEntries(res.entries)[0];
  const [ma, mi, pa] = pkg.version.split('.').map(Number);
  vi.setFileVersion(ma, mi, pa, 0, 1033); vi.setProductVersion(ma, mi, pa, 0, 1033);
  vi.setStringValues({ lang: 1033, codepage: 1200 }, {
    FileDescription: 'Desktop Carpet', ProductName: 'Desktop Carpet', CompanyName: 'Desktop Carpet',
    LegalCopyright: 'Desktop Carpet', OriginalFilename: 'DesktopCarpet.exe', InternalName: 'DesktopCarpet',
  });
  vi.outputToResourceEntries(res.entries);
  res.outputResource(exe);
  fs.writeFileSync(exePath, Buffer.from(exe.generate()));
  console.log('packaged', out);
})().catch((e) => { console.error(e); process.exit(1); });
