import type NodeCache from "node-cache";

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
  var cachePort: NodeCache;
  // your cache names
}

export {};
