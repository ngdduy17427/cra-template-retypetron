import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";
import * as path from "node:path";
import * as url from "node:url";

const isEnvSet = "ELECTRON_IS_DEV" in process.env;
const getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV as string, 10) === 1;
const isDev = isEnvSet ? getFromEnv : !app.isPackaged;

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    } as Electron.WebPreferences,
  });

  ipcMain.on("HelloWorld", async (_: IpcMainEvent, __: any[]) => {
    mainWindow?.webContents.send("HelloWorld", { message: "Hello World" });
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : url.format({
          pathname: path.join(__dirname, "./index.html"),
          protocol: "file:",
          slashes: true,
        })
  );

  isDev && mainWindow.webContents.openDevTools();
  !isDev && mainWindow.removeMenu();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.maximize();
  mainWindow.show();
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
