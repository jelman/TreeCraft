const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  onMenuAction: (callback) => ipcRenderer.on('menu-new', callback),
  onMenuLoad: (callback) => ipcRenderer.on('menu-load', callback),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', callback),
  onMenuAbout: (callback) => ipcRenderer.on('menu-about', callback),
});
