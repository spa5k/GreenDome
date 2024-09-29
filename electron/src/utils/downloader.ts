import { app, BrowserWindow, session } from "electron";
import log from "electron-log";
import fs from "fs/promises";
import path from "path";
import { URL } from "url";
import { updateProgress, updateStatus } from "./events";

interface DownloadOptions {
  directory?: string;
  filename?: string;
  retries?: number;
  timeout?: number;
}

export async function downloadFile(
  loadingWindow: BrowserWindow,
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
      await downloadWithTimeout(loadingWindow, url, tempFilePath, timeout);
      await retryRename(tempFilePath, filePath, retries);
      await setFilePermissions(filePath);
      log.info(`File downloaded successfully: ${filePath}`);
      loadingWindow.webContents.send("download-complete");
      return;
    } catch (error) {
      log.error(`Download attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        await fs.unlink(tempFilePath).catch(() => {}); // Clean up temp file
        loadingWindow.webContents.send("download-error", `Failed to download file after ${retries} attempts`);
        throw new Error(`Failed to download file after ${retries} attempts`);
      }
    }
  }
}

function downloadWithTimeout(
  loadingWindow: BrowserWindow,
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
          updateStatus("Download interrupted", loadingWindow);
        } else if (state === "progressing") {
          if (item.isPaused()) {
            log.info("Download paused");
            updateStatus("Download paused", loadingWindow);
          } else {
            const progress = item.getReceivedBytes() / item.getTotalBytes();
            updateProgress(progress * 100, loadingWindow);
          }
        }
      });

      item.once("done", (event, state) => {
        clearTimeout(timeoutId);
        if (state === "completed") {
          resolve();
        } else {
          loadingWindow.webContents.send("download-error", `Download failed: ${state}`);
          reject(new Error(`Download failed: ${state}`));
        }
      });
    });
  });
}

async function retryRename(tempFilePath: string, filePath: string, retries: number): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await fs.copyFile(tempFilePath, filePath);
      await fs.unlink(tempFilePath);
      return;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      log.warn(`Rename attempt ${attempt} failed: ${error instanceof Error ? error.message : String(error)}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
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
