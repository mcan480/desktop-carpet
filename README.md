# Desktop Carpet

A rug for your desktop. Grab it, lift a corner and sweep your files under it.

**Download:** [latest Windows installer](https://github.com/mcan480/desktop-carpet/releases/latest/download/DesktopCarpet-Setup.exe) · licenses at [desktopcarpet.com](https://desktopcarpet.com)

© Desktop Carpet. All rights reserved. The source is visible here so releases can be built automatically; it is not licensed for reuse or redistribution.

## How a release is made
1. Bump `version` in `package.json` (and `VERSION` in `installer/installer.nsi`).
2. Add `release-notes/vX.Y.Z.md`.
3. Push a tag `vX.Y.Z`. GitHub Actions builds `DesktopCarpet-Setup.exe` on Windows and publishes the release.
   Installed apps find it within a few hours and offer "Restart and update".

## Layout
- `app/` the 3D rug (cloth physics `cloth.js`, patterns `rugTexture.js`, site designs `siteRugs.js`)
- `panel/` control panel UI and translations (`i18n.js`)
- `electron/` main process: license, menus, auto-update
- `installer/` NSIS installer
