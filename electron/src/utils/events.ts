import { BrowserWindow } from "electron";

export const updateProgress = (progress: number, loadingWindow: BrowserWindow) => {
  loadingWindow!.webContents.send("download-progress", progress);
};

export const updateStatus = (status: string, loadingWindow: BrowserWindow) => {
  loadingWindow!.webContents.send("current-status", status);
};
