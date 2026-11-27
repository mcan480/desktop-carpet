// The one-time rating window (panel/feedback.html): send the stars, the comment and the name, skip, or close after "thank you".
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dcfb', {
  send: (stars, text, name) => ipcRenderer.invoke('fb-send', stars, text, name),
  skip: () => ipcRenderer.send('fb-skip'),
  close: () => ipcRenderer.send('fb-done'),
});
