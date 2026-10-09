; Desktop Carpet installer (per-user, no admin rights needed)
Unicode true
ManifestDPIAware true
SetCompressor /SOLID lzma
SetCompressorDictSize 64

!define APPNAME "Desktop Carpet"
!define EXE "DesktopCarpet.exe"
!define APPID "com.desktopcarpet.app"
!ifndef VERSION
  !define VERSION "1.0.4"
!endif
!define UNINSTKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\DesktopCarpet"

Name "${APPNAME}"
OutFile "..\dist\DesktopCarpet-Setup.exe"
InstallDir "$LOCALAPPDATA\Programs\${APPNAME}"
InstallDirRegKey HKCU "${UNINSTKEY}" "InstallLocation"
RequestExecutionLevel user
BrandingText "desktopcarpet.com"

VIProductVersion "${VERSION}.0"
VIAddVersionKey "ProductName" "${APPNAME}"
VIAddVersionKey "FileDescription" "${APPNAME} Setup"
VIAddVersionKey "CompanyName" "Desktop Carpet"
VIAddVersionKey "LegalCopyright" "Desktop Carpet"
VIAddVersionKey "FileVersion" "${VERSION}"
VIAddVersionKey "ProductVersion" "${VERSION}"

!include "MUI2.nsh"
!define MUI_ICON "..\electron\icon.ico"
!define MUI_UNICON "..\electron\icon.ico"
!define MUI_ABORTWARNING
!define MUI_WELCOMEFINISHPAGE_BITMAP "sidebar.bmp"
!define MUI_UNWELCOMEFINISHPAGE_BITMAP "sidebar.bmp"
!define MUI_FINISHPAGE_RUN "$INSTDIR\${EXE}"
!define MUI_FINISHPAGE_RUN_TEXT "$(RunText)"

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "Turkish"
!insertmacro MUI_LANGUAGE "Spanish"
!insertmacro MUI_LANGUAGE "German"
!insertmacro MUI_LANGUAGE "French"
!insertmacro MUI_LANGUAGE "PortugueseBR"
!insertmacro MUI_LANGUAGE "Italian"
!insertmacro MUI_LANGUAGE "Russian"
!insertmacro MUI_LANGUAGE "Polish"
!insertmacro MUI_LANGUAGE "Japanese"
!insertmacro MUI_LANGUAGE "SimpChinese"
!insertmacro MUI_LANGUAGE "Korean"
LangString RunText ${LANG_ENGLISH} "Start Desktop Carpet"
LangString RunText ${LANG_TURKISH} "Desktop Carpet'i başlat"
LangString RunText ${LANG_SPANISH} "Iniciar Desktop Carpet"
LangString RunText ${LANG_GERMAN} "Desktop Carpet starten"
LangString RunText ${LANG_FRENCH} "Lancer Desktop Carpet"
LangString RunText ${LANG_PORTUGUESEBR} "Iniciar o Desktop Carpet"
LangString RunText ${LANG_ITALIAN} "Avvia Desktop Carpet"
LangString RunText ${LANG_RUSSIAN} "Запустить Desktop Carpet"
LangString RunText ${LANG_POLISH} "Uruchom Desktop Carpet"
LangString RunText ${LANG_JAPANESE} "Desktop Carpet を起動"
LangString RunText ${LANG_SIMPCHINESE} "启动 Desktop Carpet"
LangString RunText ${LANG_KOREAN} "Desktop Carpet 실행"

!define MUI_LANGDLL_ALLLANGUAGES
Function .onInit
  ; Silent installs (automatic updates) skip the language question.
  IfSilent +2
  !insertmacro MUI_LANGDLL_DISPLAY
FunctionEnd

; After an automatic (silent) update, start the new version again.
Function .onInstSuccess
  IfSilent 0 +2
  Exec '"$INSTDIR\${EXE}"'
FunctionEnd

Section "Install"
  ; Close a running copy so files can be replaced.
  nsExec::Exec 'taskkill /F /IM "${EXE}"'
  Sleep 600
  SetOutPath "$INSTDIR"
  RMDir /r "$INSTDIR\resources"
  File /r "..\dist\Desktop Carpet-win32-x64\*.*"
  WriteUninstaller "$INSTDIR\Uninstall.exe"

  CreateShortCut "$DESKTOP\${APPNAME}.lnk" "$INSTDIR\${EXE}" "" "$INSTDIR\${EXE}" 0
  CreateShortCut "$SMPROGRAMS\${APPNAME}.lnk" "$INSTDIR\${EXE}" "" "$INSTDIR\${EXE}" 0

  WriteRegStr HKCU "${UNINSTKEY}" "DisplayName" "${APPNAME}"
  WriteRegStr HKCU "${UNINSTKEY}" "DisplayVersion" "${VERSION}"
  WriteRegStr HKCU "${UNINSTKEY}" "Publisher" "Desktop Carpet"
  WriteRegStr HKCU "${UNINSTKEY}" "URLInfoAbout" "https://desktopcarpet.com"
  WriteRegStr HKCU "${UNINSTKEY}" "DisplayIcon" "$INSTDIR\${EXE}"
  WriteRegStr HKCU "${UNINSTKEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr HKCU "${UNINSTKEY}" "UninstallString" '"$INSTDIR\Uninstall.exe"'
  WriteRegDWORD HKCU "${UNINSTKEY}" "NoModify" 1
  WriteRegDWORD HKCU "${UNINSTKEY}" "NoRepair" 1
  WriteRegDWORD HKCU "${UNINSTKEY}" "EstimatedSize" 330000
SectionEnd

Function un.onInit
  !insertmacro MUI_UNGETLANGUAGE
FunctionEnd

Section "Uninstall"
  nsExec::Exec 'taskkill /F /IM "${EXE}"'
  Sleep 600
  Delete "$DESKTOP\${APPNAME}.lnk"
  Delete "$SMPROGRAMS\${APPNAME}.lnk"
  DeleteRegValue HKCU "Software\Microsoft\Windows\CurrentVersion\Run" "${APPID}"
  DeleteRegKey HKCU "${UNINSTKEY}"
  RMDir /r "$INSTDIR"
SectionEnd
