import type NodeCache from "node-cache";

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
  var cachePort: NodeCache;
  var isPlaying: boolean;
  var electron: {
    ipcRenderer: {
      send: (channel: string, data: any) => void;
    };
    setPlay: () => void;
    setPause: () => void;
    onPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
  };
}

export {};
