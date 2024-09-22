import { createRoute, type OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "electron";
import z from "zod";
import { db } from "../../db";
import { getAyahsBySurahNumber, getAyahsBySurahNumberAndEditionName } from "../../db/ayah";

export function AyahRoutes(app: OpenAPIHono<Env, {}, "/">) {
  const getAyahsBySurahNumberRoute = createRoute({
    method: "get",
    path: "/surah/{surahNumber}",
    tags: ["Ayah"],
    request: {
      params: z.object({
        surahNumber: z.string().openapi({
          param: {
            name: "surahNumber",
            in: "path",
          },
          example: "1",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.number(),
                surahNumber: z.number(),
                ayahNumber: z.number(),
                editionId: z.number(),
                text: z.string(),
              }),
            ),
          },
        },
        description: "List of Ayahs by Surah number",
      },
    },
  });

  app.openapi(getAyahsBySurahNumberRoute, async (c) => {
    const surahNumber = parseInt(c.req.param("surahNumber"));

    const ayahs = await getAyahsBySurahNumber(db, surahNumber);
    return c.json(ayahs);
  });

  // get ayahs by surah number and edition id
  const getAyahsBySurahNumberAndEditionNameRoute = createRoute({
    method: "get",
    tags: ["Ayah"],

    path: "/surah/{surahNumber}/{editionName}",
    request: {
      params: z.object({
        surahNumber: z.string().openapi({
          param: {
            name: "surahNumber",
            in: "path",
          },
          example: "1",
        }),
        editionName: z.string().openapi({
          param: {
            name: "editionName",
            in: "path",
          },
          example: "1",
        }),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.array(
              z.object({
                id: z.number(),
                surahNumber: z.number(),
                ayahNumber: z.number(),
                editionId: z.number(),
                text: z.string(),
              }),
            ),
          },
        },
        description: "List of Ayahs by Surah number and Edition ID",
      },
    },
  });

  app.openapi(getAyahsBySurahNumberAndEditionNameRoute, async (c) => {
    const surahNumber = parseInt(c.req.param("surahNumber"));
    const editionName = c.req.param("editionName");
    const ayahs = await getAyahsBySurahNumberAndEditionName(db, surahNumber, editionName);
    return c.json(ayahs);
  });
}
