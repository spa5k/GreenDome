import Database from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import path from 'path';
import { DB } from './db_types.js';

// lol
const dbpath = path.resolve();
const root = path.resolve(dbpath, '../', '../', './tauri', './data', 'quran.db');

// const sqlite = new Database(root);

// const extensionPath = path.resolve(dbpath, '../', '../', './tauri', 'libsqlite_zstd.so');

const sqlite = new Database(root);
// sqlite.loadExtension(extensionPath);

export const db = new Kysely<DB>({
	dialect: new SqliteDialect({
		database: sqlite,
	}),
	plugins: [new CamelCasePlugin()],
});
