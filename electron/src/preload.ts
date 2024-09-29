import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getHonoPort: () => {
    console.log("😊 getPort preload ");
    return ipcRenderer.sendSync("getHonoPort");
  },
  audioStateFromElectron: (callback: (state: "play" | "pause" | "stop") => void) =>
    ipcRenderer.on("audio-state-from-electron", (_, state) => callback(state)),
  audioStateToElectron: (state: "play" | "pause" | "stop") => ipcRenderer.send("audio-state-to-electron", state),
});
