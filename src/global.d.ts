import type NodeCache from "node-cache";

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
  var cachePort: NodeCache;
  var isPlaying: boolean;
  var electron: {
    ipcRenderer: {
      send: (channel: string, data: unknown) => void;
    };
    setPlay: () => void;
    setPause: () => void;
    getPlayingState: () => boolean;
    onPlay: (callback: () => void) => void;
    onPause: (callback: () => void) => void;
  };
}

type PlaybackAction =
  | { type: "PLAY" }
  | { type: "PAUSE" };

export {};
