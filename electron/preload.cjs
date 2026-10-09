const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('halim', {
  setIgnoreMouse: (ignore) => ipcRenderer.send('ignore-mouse', ignore),
  showMenu: () => ipcRenderer.send('show-menu'),
  saveState: (s) => ipcRenderer.send('save-state', s),
  loadState: () => ipcRenderer.invoke('load-state'),
  reportState: (s) => ipcRenderer.send('report-state', s),
  onCommand: (fn) => ipcRenderer.on('command', (_e, cmd, arg) => fn(cmd, arg)),
});
