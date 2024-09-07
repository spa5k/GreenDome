import { app, BrowserWindow } from "electron";
import log from "electron-log";
import fs from "fs";
import https from "https";
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
  const directory = options.directory || app.getPath("userData");
  const urlObject = new URL(url);
  const filename = options.filename || path.basename(urlObject.pathname);
  const filePath = path.join(directory, filename);
  const retries = options.retries || 3;
  const timeout = options.timeout || 60_000; // 10 seconds

  log.info(`Downloading file: ${url}`);
  log.info(`Downloading to: ${filePath}`);

  // Check if the file exists and delete it if it does
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      log.info(`Deleted existing file: ${filePath}`);
    } catch (err) {
      log.error(`Failed to delete existing file: ${filePath}`, err);
      throw err;
    }
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const request = https.get(url, (response) => {
          if (response.statusCode === 200) {
            const fileStream = fs.createWriteStream(filePath);
            response.pipe(fileStream);

            response.on("data", (chunk) => {
              log.info(`Downloading... ${chunk.length} bytes received`);
            });

            fileStream.on("finish", () => {
              fileStream.close();
              log.info(`Downloaded to: ${filePath}`);
              resolve();
            });
            return;
          }
          if (response.statusCode === 302 || response.statusCode === 301) {
            // Handle redirects
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
              log.info(`Redirecting to: ${redirectUrl}`);
              downloadFile(mainWindow, redirectUrl, options)
                .then(resolve)
                .catch(reject);
            } else {
              reject(new Error(`Redirect without location header`));
            }
          } else {
            reject(
              new Error(
                `Failed to download file: ${response.statusCode} ${response.statusMessage}`,
              ),
            );
          }
        });

        request.on("error", (err) => {
          log.error("Download error:", err);
          reject(err);
        });

        request.setTimeout(timeout, () => {
          request.destroy();
          reject(new Error("Download request timed out"));
        });

        request.end();
      });
      break; // Exit the retry loop if successful
    } catch (error: any) {
      log.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        throw new Error(`Failed to download file after ${retries} attempts`);
      }
      log.info(`Retrying download... (${attempt}/${retries})`);
    }
  }
}

export default downloadFile;
