import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

interface IElectronAPI {
  send: (channel: string, ...args: any[]) => Promise<void>;
  receive: (
    channel: string,
    callback: (event: IpcRendererEvent, ...args: any[]) => void
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
  send: (channel: string, ...args: any[]) => {
    if (validChannels.includes(channel)) ipcRenderer.send(channel, args);
  },
  receive: (channel: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => {
    if (validChannels.includes(channel))
      ipcRenderer.on(channel, (event, ...args) => callback(event, ...args));
  },
  removeAllListeners: (channel: string) => {
    if (validChannels.includes(channel)) ipcRenderer.removeAllListeners(channel);
  },
});
