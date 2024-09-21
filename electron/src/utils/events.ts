import { BrowserWindow } from "electron";

export const updateProgress = (progress: number, loadingWindow: BrowserWindow) => {
  console.log("updateProgress", progress);
  loadingWindow!.webContents.send("download-progress", progress);
};

export const updateStatus = (status: string, loadingWindow: BrowserWindow) => {
  console.log("updateStatus", status);
  loadingWindow!.webContents.send("current-status", status);
};
