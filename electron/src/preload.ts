import { contextBridge, ipcRenderer } from "electron";

// contextBridge.exposeInMainWorld("electronAPI", {
//   getHonoPort: () => {
//     console.log("😊 getPort preload ");
//     return ipcRenderer.sendSync("getHonoPort");
//   },
//   setAudioState: (state: "play" | "pause" | "stop") => ipcRenderer.send("set-audio-state", state),
// });

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
  },
  setPlay: () => ipcRenderer.send("set-play"),
  setPause: () => ipcRenderer.send("set-pause"),
  onPlay: (callback: () => void) => ipcRenderer.on("play", callback),
  onPause: (callback: () => void) => ipcRenderer.on("pause", callback),
});
