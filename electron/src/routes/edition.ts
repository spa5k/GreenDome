import { createRoute, type OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "electron";
import * as z from "zod";
import {
  getDisabledEditions,
  getEditions,
  getEditionsByLanguage,
  getEditionsByType,
  getEnabledEditions,
  getLanguages,
} from "../../db/edition";

// Define the schema for the responses based on the Edition table
const EditionSchema = z.object({
  id: z.number(),
  name: z.string(),
  author: z.string().nullable(),
  language: z.string(),
  direction: z.string(),
  source: z.string().nullable(),
  type: z.string(),
  enabled: z.number(),
});

export function EditionRoutes(app: OpenAPIHono<Env, {}, "/">) {
  // fetch where edition of type
  const editionTypeRoute = createRoute({
    tags: ["Edition"],
    method: "get",
    path: "/editions/type/{type}",
    request: {
      params: z.object({
        type: z
          .enum([
            "TRANSLATION",
            "QURAN",
            "TRANSLITERATION",
            "QURAN_TRANSLITERATION",
          ])
          .openapi({
            param: {
              name: "type",
              in: "path",
            },
            example: "TRANSLATION",
          }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(EditionSchema),
          },
        },
        description: "Fetch all editions where type is {type}",
      },
    },
  });

  app.openapi(editionTypeRoute, async (c) => {
    const type = c.req.param("type");
    const editions = getEditionsByType(type);
    return c.json(editions);
  });

  // Route for fetching all editions
  const allEditionsRoute = createRoute({
    tags: ["Edition"],
    method: "get",
    path: "/editions",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(EditionSchema),
          },
        },
        description: "Fetch all editions",
      },
    },
  });

  app.openapi(allEditionsRoute, async (c) => {
    const editions = getEditions();

    return c.json(editions);
  });

  // Route for fetching editions by language
  const editionsByLanguageRoute = createRoute({
    tags: ["Edition"],
    method: "get",
    path: "/editions/language/{language}",
    request: {
      params: z.object({
        language: z.string().openapi({
          param: {
            name: "language",
            in: "path",
          },
          example: "en",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(EditionSchema),
          },
        },
        description: "Fetch all editions where language is {language}",
      },
    },
  });

  app.openapi(editionsByLanguageRoute, async (c) => {
    const language = c.req.param("language");
    const editions = getEditionsByLanguage(language);
    return c.json(editions);
  });

  // Route for fetching all unique languages
  const languagesRoute = createRoute({
    tags: ["Edition"],
    method: "get",
    path: "/editions/languages",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(z.string().openapi({})),
            example: [
              "Achinese",
              "Afar",
              "Afrikaans",
              "Albanian",
              "Amharic",
              "Arabic",
              "Assamese",
              "Azerbaijani",
              "Bambara",
            ],
          },
        },
        description: "Fetch all unique languages",
      },
    },
  });

  app.openapi(languagesRoute, async (c) => {
    const languages = getLanguages();
    const res: string[] = [];
    for (const lang of languages) {
      if (!res.includes(lang.language)) {
        res.push(lang.language);
      }
    }
    return c.json(res);
  });

  // Route for fetching all enabled editions
  const enabledEditionsRoute = createRoute({
    tags: ["Edition"],
    method: "get",
    path: "/editions/{status}",
    request: {
      params: z.object({
        status: z.enum(["enabled", "disabled"]).openapi({
          param: {
            name: "status",
            in: "path",
          },
          example: "enabled",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(EditionSchema),
          },
        },
        description: "Fetch all {status} editions",
      },
    },
  });

  app.openapi(enabledEditionsRoute, async (c) => {
    const status = c.req.param("status");
    const editions = status === "enabled" ? getEnabledEditions() : getDisabledEditions();
    return c.json(editions);
  });
}
