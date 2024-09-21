import SQLite from "better-sqlite3";
import { app } from "electron";
import fs from "fs";
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import path from "path";
import type { Database } from "./schema";

const dbPath = path.join(app.getPath("userData"), "quran.db");

const dialect = new SqliteDialect({
  database: new SQLite(dbPath),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
});

export const checkIfDbExists = async () => {
  try {
    await fs.promises.access(dbPath); // Added await and changed to promises
    console.log("DB exists:", dbPath);
    return true;
  } catch (error) {
    console.log("DB does not exist:", dbPath);
    return false;
  }
};
