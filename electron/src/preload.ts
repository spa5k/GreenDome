import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getHonoPort: () => {
    console.log("😊 getPort preload ");
    return ipcRenderer.sendSync("getHonoPort");
  },
});
