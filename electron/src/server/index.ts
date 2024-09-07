import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import log from "electron-log";
import { getPort } from "get-port-please";
import { AyahRoutes } from "../routes/ayah";
import { EditionRoutes } from "../routes/edition";

export async function startHonoServer() {
  try {
    const honoPort = await getPort({ portRange: [50_000, 51_000] });
    log.info("Hono server port:", honoPort);

    const app = new OpenAPIHono();

    // OpenAPI documentation setup
    app.doc("/doc", {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "My API",
      },
    });

    // Swagger UI setup
    app.get("/ui", swaggerUI({ url: "/doc" }));

    // Health check route
    app.get("/health", (c) => c.text("Hono!"));

    AyahRoutes(app);
    EditionRoutes(app);

    serve({
      fetch: app.fetch,
      port: honoPort,
      hostname: "localhost",
    });

    // list hono routes
    // log.info("Hono routes:", app.routes);
    for (const route of app.routes) {
      console.log("Route", route.path, route.method);
    }

    return honoPort;
  } catch (error) {
    log.error("Error starting Hono server:", error);
    throw error;
  }
}
