// Build: package the Electron app.
//   node build.cjs        → Windows x64: branded exe in dist/Desktop Carpet-win32-x64 (installer/installer.nsi makes the setup)
//   node build.cjs mac    → macOS universal (Apple Silicon + Intel): dist/Desktop Carpet-darwin-universal/Desktop Carpet.app, DesktopCarpet-Mac.zip (updates)
//                           and DesktopCarpet-Mac.dmg (downloads). Must run on a Mac (codesign, ditto, hdiutil).
const { packager } = require('@electron/packager');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const pkg = require('./package.json');

const MAC = process.argv[2] === 'mac';
const ELECTRON = '44.7.0';

// Fuses: switch off ways to run the binary as something other than Desktop Carpet
// (plain Node.js mode, NODE_OPTIONS, debugger flags) and only load the app from its asar.
async function fuses(binaryOrApp, darwin) {
  const { flipFuses, FuseVersion, FuseV1Options } = require('@electron/fuses');
  await flipFuses(binaryOrApp, {
    version: FuseVersion.V1,
    resetAdHocDarwinSignature: darwin,
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [FuseV1Options.EnableNodeCliInspectArguments]: false,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
  });
}

const common = (extraIgnore) => ({
  dir: '.', name: 'Desktop Carpet', electronVersion: ELECTRON, out: 'dist', overwrite: true, prune: true,
  asar: { unpack: '**/*.node' }, appVersion: pkg.version, appCopyright: 'Desktop Carpet',
  ignore: [/^\/dist/, /^\/build\.cjs/, /^\/pack\.cjs/, /^\/installer/, /^\/sign/, /^\/release-notes/, /^\/\.github/,
           /^\/app\/(main|cloth|rugTexture|siteRugs)\.js$/, /^\/app\/vendor/,
           /node_modules\/(three|esbuild|@esbuild|resedit|pe-library|@fontsource|@electron)/, ...extraIgnore],
});

async function buildWindows() {
  const [out] = await packager({
    ...common([/node_modules\/@koromix\/koffi-(linux|darwin|freebsd|openbsd|android|win32-(ia32|arm64))/, /^\/electron\/(icon\.icns|trayTemplate)/]),
    executableName: 'DesktopCarpet', platform: 'win32', arch: 'x64',
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
  await fuses(exePath, false);
  console.log('packaged', out);
}

async function buildMac() {
  const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'inherit', ...opts });
  const [out] = await packager({
    ...common([/node_modules\/@koromix\/koffi-(linux|win32|freebsd|openbsd|android)/, /^\/electron\/(icon\.ico|tray\.ico)/]),
    platform: 'darwin', arch: 'universal', icon: 'electron/icon.icns',
    appBundleId: 'com.desktopcarpet.app', appCategoryType: 'public.app-category.utilities', darwinDarkModeSupport: true,
    // koffi ships one native file per architecture (both are in both halves); they're picked at runtime.
    osxUniversal: { x64ArchFiles: '**/node_modules/@koromix/**' },
    extendInfo: { LSMinimumSystemVersion: '12.0', NSHumanReadableCopyright: 'Desktop Carpet' },
  });
  const appPath = path.join(out, 'Desktop Carpet.app');
  await fuses(appPath, true);

  // Sign: with an Apple Developer ID when MAC_SIGN_IDENTITY is set (and notarize when the Apple ID secrets exist),
  // otherwise ad hoc, which Apple Silicon needs for the app to start at all.
  const identity = process.env.MAC_SIGN_IDENTITY || '-';
  const signArgs = ['--force', '--deep', '--sign', identity];
  if (identity !== '-') signArgs.push('--options', 'runtime', '--timestamp', '--entitlements', 'installer/mac-entitlements.plist');
  run('codesign', [...signArgs, appPath]);
  run('codesign', ['--verify', '--deep', '--strict', '--verbose=2', appPath]);

  const zip = path.join('dist', 'DesktopCarpet-Mac.zip');
  const dmg = path.join('dist', 'DesktopCarpet-Mac.dmg');
  fs.rmSync(zip, { force: true }); fs.rmSync(dmg, { force: true });
  run('ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', appPath, zip]);

  if (identity !== '-' && process.env.APPLE_ID && process.env.APPLE_APP_PASSWORD && process.env.APPLE_TEAM_ID) {
    run('xcrun', ['notarytool', 'submit', zip, '--apple-id', process.env.APPLE_ID, '--password', process.env.APPLE_APP_PASSWORD,
                  '--team-id', process.env.APPLE_TEAM_ID, '--wait']);
    run('xcrun', ['stapler', 'staple', appPath]);
    fs.rmSync(zip, { force: true });
    run('ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', appPath, zip]);
  }

  // Disk image: the app plus an Applications shortcut to drag it onto.
  const stage = path.join('dist', 'dmg');
  fs.rmSync(stage, { recursive: true, force: true });
  fs.mkdirSync(stage, { recursive: true });
  run('ditto', [appPath, path.join(stage, 'Desktop Carpet.app')]);
  fs.symlinkSync('/Applications', path.join(stage, 'Applications'));
  run('hdiutil', ['create', '-volname', 'Desktop Carpet', '-srcfolder', stage, '-ov', '-format', 'UDZO', dmg]);
  if (identity !== '-') run('codesign', ['--sign', identity, '--timestamp', dmg]);
  fs.rmSync(stage, { recursive: true, force: true });
  console.log('packaged', appPath, zip, dmg);
}

(async () => {
  require('esbuild').buildSync({ entryPoints: ['app/main.js'], bundle: true, format: 'iife', minify: true, outfile: 'app/bundle.js' });
  if (MAC) await buildMac(); else await buildWindows();
})().catch((e) => { console.error(e); process.exit(1); });
