import type NodeCache from "node-cache";

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
  var cachePort: NodeCache;
  var isPlaying: boolean;
}

export {};
