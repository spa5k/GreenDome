import { app, BrowserWindow, session } from "electron";
import log from "electron-log";
import fs from "fs/promises";
import path from "path";
import { URL } from "url";

interface DownloadOptions {
  directory?: string;
  filename?: string;
  retries?: number;
  timeout?: number;
}

export async function downloadFile(
  mainWindow: BrowserWindow,
  url: string,
  options: DownloadOptions = {},
): Promise<void> {
  const directory = app.getPath("userData");
  const urlObject = new URL(url);
  const filename = options.filename || path.basename(urlObject.pathname);
  const filePath = path.join(directory, filename);
  const tempFilePath = `${filePath}.temp`;
  const retries = options.retries || 3;
  const timeout = options.timeout || 60_000; // 60 seconds

  log.info(`Downloading file: ${url}`);
  log.info(`Downloading to: ${filePath}`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await downloadWithTimeout(mainWindow, url, tempFilePath, timeout);
      await fs.rename(tempFilePath, filePath);
      await setFilePermissions(filePath);
      log.info(`File downloaded successfully: ${filePath}`);
      mainWindow.webContents.send("download-complete");
      return;
    } catch (error) {
      log.error(`Download attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        await fs.unlink(tempFilePath).catch(() => {}); // Clean up temp file
        mainWindow.webContents.send("download-error", `Failed to download file after ${retries} attempts`);
        throw new Error(`Failed to download file after ${retries} attempts`);
      }
    }
  }
}

function downloadWithTimeout(
  mainWindow: BrowserWindow,
  url: string,
  tempFilePath: string,
  timeout: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Download timed out"));
    }, timeout);

    session.defaultSession.downloadURL(url);

    session.defaultSession.on("will-download", (event, item) => {
      item.setSavePath(tempFilePath);

      item.on("updated", (event, state) => {
        if (state === "interrupted") {
          log.warn("Download interrupted");
          mainWindow.webContents.send("download-status", "interrupted");
        } else if (state === "progressing") {
          if (item.isPaused()) {
            log.info("Download paused");
            mainWindow.webContents.send("download-status", "paused");
          } else {
            const progress = item.getReceivedBytes() / item.getTotalBytes();
            mainWindow.webContents.send("download-progress", progress * 100);
          }
        }
      });

      item.once("done", (event, state) => {
        clearTimeout(timeoutId);
        if (state === "completed") {
          resolve();
        } else {
          mainWindow.webContents.send("download-error", `Download failed: ${state}`);
          reject(new Error(`Download failed: ${state}`));
        }
      });
    });
  });
}

async function setFilePermissions(filePath: string): Promise<void> {
  if (process.platform !== "win32") {
    try {
      await fs.chmod(filePath, 0o644);
    } catch (error) {
      log.error(`Failed to set file permissions: ${error}`);
    }
  }
}
