import { BrowserWindow, nativeImage } from "electron";
import path from "path";
import { appState } from "./state";

const playIcon = nativeImage.createFromPath(path.join(__dirname, "../public/icons/interface/play.png"));
const pauseIcon = nativeImage.createFromPath(path.join(__dirname, "../public/icons/interface/pause.png"));

export function emptyThumbarButtons(mainWindow: BrowserWindow) {
  mainWindow.setThumbarButtons([]);
}

export function updateThumbarButtons(mainWindow: BrowserWindow) {
  mainWindow.setThumbarButtons([
    {
      tooltip: appState.isPlaying ? "Pause" : "Play",
      icon: appState.isPlaying ? pauseIcon : playIcon,
      click: () => {
        if (appState.isPlaying) {
          mainWindow.webContents.send("pause");
        } else {
          mainWindow.webContents.send("play");
        }
      },
    },
  ]);
}
