const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,

  // We wrap the ipcRenderer.invoke('ping') in a function called ping NEVER directly expose ipcRenderer module via preload
  // this would give yout renderer the ability to send arbitrary IPC messages to the main process
  // which becomes a powerful attack vector for malicious code.
  ping: () => ipcRenderer.invoke("ping"),
  // we can also exposes variables, not just functions
});
