import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import * as schema from "./schema";

const userData = app.getPath("userData");
const dbPath = `${userData}/quran.db`;

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
