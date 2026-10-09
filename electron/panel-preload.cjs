const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dc', {
  ready: () => ipcRenderer.send('panel-ready'),
  onState: (fn) => ipcRenderer.on('state', (_e, s) => fn(s)),
  activate: (key) => ipcRenderer.invoke('license-activate', key),
  recheck: () => ipcRenderer.invoke('license-recheck'),
  deactivate: () => ipcRenderer.invoke('license-deactivate'),
  forget: () => ipcRenderer.invoke('license-forget'),
  recover: (email) => ipcRenderer.invoke('license-recover', email),
  rug: (cmd, arg) => ipcRenderer.send('rug', cmd, arg),
  setting: (name, value) => ipcRenderer.send('setting', name, value),
  open: (which) => ipcRenderer.send('open-url', which),
  quit: () => ipcRenderer.send('quit'),
  installUpdate: () => ipcRenderer.send('install-update'),
});
