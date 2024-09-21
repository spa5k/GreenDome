import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import fs from "fs";
import path from "path";
import * as schema from "./schema";

const sqlite = () => {
  const userData = app.getPath("userData");
  const dbDir = path.join(userData, "databases");
  const dbPath = path.join(dbDir, "quran.db");

  // Create the directory if it doesn't exist
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const sqlite = new Database(dbPath);
  return sqlite;
};

// Lazy initialization of the database
let dbInstance: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (!dbInstance) {
    dbInstance = drizzle(sqlite(), { schema });
  }
  return dbInstance;
};
