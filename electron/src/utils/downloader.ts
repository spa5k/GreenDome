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

async function downloadFile(
  mainWindow: BrowserWindow,
  url: string,
  options: DownloadOptions = {},
): Promise<void> {
  const directory = options.directory || getAppDataPath();
  const urlObject = new URL(url);
  const filename = options.filename || path.basename(urlObject.pathname);
  const filePath = path.join(directory, filename);
  const tempFilePath = `${filePath}.temp`;
  const retries = options.retries || 3;
  const timeout = options.timeout || 60_000; // 60 seconds

  log.info(`Downloading file: ${url}`);
  log.info(`Downloading to: ${filePath}`);

  // Ensure the directory exists
  try {
    await fs.mkdir(directory, { recursive: true });
    log.info(`Ensured directory exists: ${directory}`);
  } catch (error) {
    log.error(`Failed to create directory: ${directory}`, error);
    throw error;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await downloadWithTimeout(mainWindow, url, tempFilePath, timeout);
      await fs.rename(tempFilePath, filePath);
      await setFilePermissions(filePath);
      log.info(`File downloaded successfully: ${filePath}`);
      return;
    } catch (error) {
      log.error(`Download attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        await fs.unlink(tempFilePath).catch(() => {}); // Clean up temp file
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
        } else if (state === "progressing") {
          if (item.isPaused()) {
            log.info("Download paused");
          } else {
            const progress = item.getReceivedBytes() / item.getTotalBytes();
            mainWindow.webContents.send("download-progress", progress);
          }
        }
      });

      item.once("done", (event, state) => {
        clearTimeout(timeoutId);
        if (state === "completed") {
          resolve();
        } else {
          reject(new Error(`Download failed: ${state}`));
        }
      });
    });
  });
}

function getAppDataPath(): string {
  switch (process.platform) {
    case "darwin":
      return path.join(app.getPath("userData"), "Databases");
    case "win32":
      return path.join(app.getPath("userData"), "Databases");
    case "linux":
      return path.join(app.getPath("userData"), "databases");
    default:
      return app.getPath("userData");
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

export default downloadFile;
