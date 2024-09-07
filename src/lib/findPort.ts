export const findPort = async (startPort: number = 50000, endPort: number = 51000): Promise<number> => {
  const port: number = parseInt(global.cachePort.get("port")!);

  if (port) {
    console.log("Found port in cache", port);
    return port;
  }
  for (let port = startPort; port < endPort; port++) {
    try {
      const response = await fetch(`http://localhost:${port}/health`);
      if (response.ok) {
        global.cachePort.set("port", port);
        console.log("Added port to cache", port);
        return port;
      }
    } catch (error) {
      // Ignore fetch errors (e.g., server not running on this port)
    }
  }
  throw new Error(`No available ports in range ${startPort}-${endPort}`);
};
