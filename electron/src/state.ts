import { BrowserWindow } from "electron";
import { updateThumbarButtons } from "./thumbButtons";

export class AppState {
  private _isPlaying: boolean = false;
  private _mainWindow: BrowserWindow | null = null;

  get isPlaying(): boolean {
    return this._isPlaying;
  }

  setPlaying(value: boolean): void {
    this._isPlaying = value;
    this.notifyStateChange();
  }

  setMainWindow(mainWindow: BrowserWindow): void {
    this._mainWindow = mainWindow;
  }

  private notifyStateChange(): void {
    // Notify all necessary components about the state change
    if (this._mainWindow) {
      updateThumbarButtons(this._mainWindow);
      this._mainWindow.webContents.send("playback-state-changed", this._isPlaying);
    }
  }
}

export const appState = new AppState();
