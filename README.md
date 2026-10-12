# Desktop Carpet

A rug for your desktop. Grab it, lift a corner and sweep your files under it.

**Download:** [latest Windows installer](https://github.com/mcan480/desktop-carpet/releases/latest/download/DesktopCarpet-Setup.exe) · licenses at [desktopcarpet.com](https://desktopcarpet.com)

© Desktop Carpet. All rights reserved. The source is visible here so releases can be built automatically; it is not licensed for reuse or redistribution.

## How a release is made
1. Bump `version` in `package.json` (and `VERSION` in `installer/installer.nsi`).
2. Add `release-notes/vX.Y.Z.md`.
3. Push to `main`. When the version has no release yet, GitHub Actions creates tag `vX.Y.Z`, builds the Windows installer, the Mac app
   and the app update (`DesktopCarpet-Patch-<shell>.asar.br`) and publishes the release.
   Installed apps find it when they start (and every few hours) and offer "Restart and update".

## Updates
- **App update** (most releases): installations with the same Electron, koffi and `SHELL_REV` (in `electron/boot.cjs`) download
  only the app's own files, about 5 MB, into their data folder; `electron/boot.cjs` runs the newest good one and goes back to
  the installed app if it fails to start twice. Raise `SHELL_REV` when the installer, the fuses or `boot.cjs` change.
- **Full update** (new Electron, or `SHELL_REV` raised): the Windows installer, or the Mac app for that processor.

## Layout
- `app/` the 3D rug (cloth physics `cloth.js`, patterns `rugTexture.js`, site designs `siteRugs.js`)
- `panel/` control panel UI and translations (`i18n.js`)
- `electron/` main process: `boot.cjs` (starts the installed app or an app update), `main.cjs` (license, menus, updates)
- `installer/` NSIS installer
