import { startHonoServer } from "./server/index.js";

// run hono server
const startServer = async () => {
  const honoPort = await startHonoServer();
};

startServer();
