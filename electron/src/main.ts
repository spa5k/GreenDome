import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { app, BrowserWindow, dialog, ipcMain, shell } from "electron";
import log from "electron-log";
import settings from "electron-settings";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server.js";
import * as path from "path";
import { join } from "path";
import { checkIfDbExists } from "../db/index.js";
import { startHonoServer } from "./server/index.js";
import { updateThumbarButtons } from "./thumbButtons.js";
import { downloadFile } from "./utils/downloader.js";
import { updateProgress, updateStatus } from "./utils/events.js";
import { nextConfig } from "./utils/nextconfig.js";
import { getLatestRelease, getLatestReleaseVersion } from "./utils/releases.js";
process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);

let mainWindow: BrowserWindow | null = null;
let loadingWindow: BrowserWindow | null = null;
let nextJSServer: any = null;
let honoServer: any = null;

global.isPlaying = false;

function createLoadingWindow(): BrowserWindow {
  const loadingWindow = new BrowserWindow({
    width: 380,
    height: 500,
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // loading is in userData
  const url = join(__dirname, "..", "public", "loading.html");
  loadingWindow.loadFile(url).catch((err) => {
    log.error("Failed to load loading window:", err);
  });

  if (process.platform === "win32") {
    loadingWindow.setBackgroundMaterial("mica");
  } else if (process.platform === "darwin") {
    loadingWindow.setBackgroundColor("#00000000");
    loadingWindow.setBackgroundMaterial("auto");
  } else {
    loadingWindow.setBackgroundColor("#00000000");
  }

  return loadingWindow;
}

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      sandbox: false,
      nodeIntegration: true,
    },
  });

  mainWindow.on("ready-to-show", () => {
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.close();
      loadingWindow = null;
    }
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  ipcMain.on("set-play", () => {
    global.isPlaying = true;
    updateThumbarButtons(mainWindow, global.isPlaying);
  });

  ipcMain.on("set-pause", () => {
    global.isPlaying = false;
    updateThumbarButtons(mainWindow, global.isPlaying);
  });

  return mainWindow;
}

async function startNextJSServer() {
  try {
    const nextJSPort = await getPort({ portRange: [30_011, 50_000] });
    const webDir = path.join(app.getAppPath(), "app");

    console.log("webDir:", webDir);

    nextJSServer = await startServer({
      dir: webDir,
      isDev: false,
      hostname: "greendome",
      port: nextJSPort,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true,
    });

    return nextJSPort;
  } catch (error) {
    log.error("Error starting Next.js server:", error);
    throw error;
  }
}

async function checkForUpdates() {
  try {
    const latestReleaseVersion = await getLatestReleaseVersion("spa5k", "quran_data");
    const lastReleaseVersion = await settings.get("lastReleaseVersion");

    const dbExists = await checkIfDbExists();
    log.info("DB exists:", dbExists);

    if (latestReleaseVersion === lastReleaseVersion && dbExists) {
      log.info("No new release found. Last release is up to date.", lastReleaseVersion);
      return false;
    } else {
      const latestReleaseUrl = await getLatestRelease("spa5k", "quran_data");
      log.info("New release found. Downloading...");
      await downloadFile(loadingWindow!, latestReleaseUrl, { filename: "quran.db" });
      await settings.set("lastReleaseVersion", latestReleaseVersion);

      log.info("Download complete.", latestReleaseVersion);
      return true;
    }
  } catch (error) {
    log.error("Error checking for updates:", error);
    return false;
  }
}

async function initializeApp() {
  try {
    updateStatus("Checking for updates...", loadingWindow!);
    await checkForUpdates();

    // set progress bar to 0
    updateProgress(0, loadingWindow!);

    updateStatus("Starting server...", loadingWindow!);
    const honoPort = await startHonoServer();
    // set progress bar to 50
    updateProgress(50, loadingWindow!);
    console.log("Backend server started on port:", `http://greendome:${honoPort}`);
    ipcMain.handle("getHonoPort", () => honoPort);

    updateStatus("Loading UI...", loadingWindow!);
    // set progress bar to 75
    updateProgress(75, loadingWindow!);

    mainWindow = createWindow();
    // set progress bar to 100
    updateProgress(90, loadingWindow!);

    if (is.dev) {
      mainWindow.loadURL("http://localhost:3000");
    } else {
      const nextJSPort = await startNextJSServer();
      mainWindow!.loadURL(`http://localhost:${nextJSPort}`);
    }
  } catch (error) {
    log.error("Error during app initialization:", error);
    dialog.showErrorBox("Error", "Failed to initialize the application. Please try again.");
    app.quit();
  }
}

app.whenReady().then(async () => {
  try {
    electronApp.setAppUserModelId("com.saybackend.greendome");

    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    ipcMain.on("ping", () => log.info("pong"));

    loadingWindow = createLoadingWindow();

    // Wait for the loading window to be ready before starting initialization
    loadingWindow.webContents.on("did-finish-load", () => {
      initializeApp();
    });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  } catch (error) {
    log.error("Error during app startup:", error);
    dialog.showErrorBox("Error", "Failed to start the application. Please try again.");
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", async () => {
  if (nextJSServer) {
    await nextJSServer.close();
  }
  if (honoServer) {
    await honoServer.close();
  }
});
