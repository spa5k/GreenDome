import { BrowserWindow, nativeImage } from "electron";
import path from "path";

const playIcon = nativeImage.createFromPath(path.join(__dirname, "../public/icons/interface/play.png"));

const pauseIcon = nativeImage.createFromPath(path.join(__dirname, "../public/icons/interface/pause.png"));

global.isPlaying = false;

export function emptyThumbarButtons(mainWindow: BrowserWindow) {
  mainWindow.setThumbarButtons([]);
}

export function updateThumbarButtons(mainWindow: BrowserWindow, isPlaying: boolean) {
  mainWindow.setThumbarButtons([
    {
      tooltip: isPlaying ? "Pause" : "Play",
      icon: isPlaying ? pauseIcon : playIcon,
      click: () => {
        if (isPlaying) {
          mainWindow.webContents.send("pause");
        } else {
          mainWindow.webContents.send("play");
        }
      },
    },
  ]);
}
