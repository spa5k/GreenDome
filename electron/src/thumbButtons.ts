import { BrowserWindow, nativeImage } from "electron";
import { pause } from "./icons/pause";
import { play } from "./icons/play";
import { stop } from "./icons/stop";

const playIcon = nativeImage.createFromDataURL(play);
const pauseIcon = nativeImage.createFromDataURL(pause);
const stopIcon = nativeImage.createFromDataURL(stop);

// Remove the local isPlaying variable

export function updateThumbarButtons(mainWindow: BrowserWindow) {
  mainWindow.setThumbarButtons([
    {
      tooltip: global.isPlaying ? "Pause" : "Play",
      icon: global.isPlaying ? pauseIcon : playIcon,
      click: () => {
        togglePlayPause(mainWindow);
      },
    },
    {
      tooltip: "Stop",
      icon: stopIcon,
      click: () => {
        stopPlayback(mainWindow);
      },
    },
  ]);
}

export function togglePlayPause(mainWindow: BrowserWindow) {
  global.isPlaying = !global.isPlaying;
  if (global.isPlaying) {
    console.log("Playing audio...");
  } else {
    console.log("Pausing audio...");
  }

  // send the event to the renderer process
  mainWindow.webContents.send("audio-state-from-electron", global.isPlaying ? "play" : "pause");
}

export function stopPlayback(mainWindow: BrowserWindow) {
  console.log("Stopping audio...");
  global.isPlaying = false;
  // send the event to the renderer process
  mainWindow.webContents.send("audio-state-from-electron", "stop");
}
