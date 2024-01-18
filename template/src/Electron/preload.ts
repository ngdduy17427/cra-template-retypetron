import { contextBridge, ipcRenderer } from "electron";

interface IElectronAPI {
  send: (channel: string, data?: any) => Promise<void>;
  receive: (
    channel: string,
    callback: (event: Electron.IpcRendererEvent, args: any[]) => void
  ) => Promise<void>;
  removeAllListeners: (channel: string) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

const validChannels = ["HelloWorld"];

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel: string, data: any) => {
    if (validChannels.includes(channel)) ipcRenderer.send(channel, data);
  },
  receive: (channel: string, func: any) => {
    if (validChannels.includes(channel))
      ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
  },
  removeAllListeners: (channel: string) => {
    if (validChannels.includes(channel)) ipcRenderer.removeAllListeners(channel);
  },
});
