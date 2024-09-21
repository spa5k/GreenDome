import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import fs from "fs";
import path from "path";
import * as schema from "./schema";

const dbPath = path.join(app.getPath("userData"), "quran.db");

export const connectToDatabase = () => {
  try {
    // Create SQLite3 database instance
    const sqlite = new Database(dbPath);

    // Connect to Drizzle
    const db = drizzle(sqlite, { schema });

    console.log("Connected to SQLite database successfully.");
    return db;
  } catch (error) {
    console.error("Error connecting to SQLite database:", error);
    throw new Error("Failed to connect to database");
  }
};

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
