import { BrowserWindow, nativeImage } from "electron";
import { pause } from "./icons/pause";
import { play } from "./icons/play";
import { stop } from "./icons/stop";

const playIcon = nativeImage.createFromDataURL(play);
const pauseIcon = nativeImage.createFromDataURL(pause);
const stopIcon = nativeImage.createFromDataURL(stop);

console.log("playIcon", playIcon.isEmpty());
console.log("pauseIcon", pauseIcon.isEmpty());

export function updateThumbarButtons(mainWindow: BrowserWindow, isPlaying: boolean) {
  mainWindow.setThumbarButtons([
    {
      tooltip: isPlaying ? "Pause" : "Play",
      icon: isPlaying ? pauseIcon : playIcon,
      click: () => {
        console.log("togglePlayPause", isPlaying);
        togglePlayPause(mainWindow, isPlaying);
      },
    },
    {
      tooltip: "Stop",
      icon: stopIcon,
      click: () => {
        console.log("stopPlayback", isPlaying);
        stopPlayback(mainWindow, isPlaying);
      },
    },
  ]);
}

function togglePlayPause(mainWindow: BrowserWindow, isPlaying: boolean) {
  isPlaying = !isPlaying;
  if (isPlaying) {
    // Start playing audio
    console.log("Playing audio...");
  } else {
    // Pause audio
    console.log("Pausing audio...");
  }
  updateThumbarButtons(mainWindow, isPlaying); // Update the Thumbar buttons to reflect play/pause state
}

function stopPlayback(mainWindow: BrowserWindow, isPlaying: boolean) {
  // Stop the audio playback
  console.log("Stopping audio...");
  isPlaying = false;
  updateThumbarButtons(mainWindow, isPlaying); // Update to reflect the stopped state
}
