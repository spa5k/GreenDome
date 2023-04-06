import Database from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import path from 'path';

// lol
const dbpath = path.resolve();
const root = path.resolve(dbpath, '../', '../', './iqra', './data', 'quran.db');

// const sqlite = new Database(root);

const extensionPath = path.resolve(dbpath, '../', '../', './iqra', 'libsqlite_zstd.so');

const sqlite = new Database(root);
sqlite.loadExtension(extensionPath);

export const db = new Kysely<DB>({
	dialect: new SqliteDialect({
		database: sqlite,
	}),
	plugins: [new CamelCasePlugin()],
});
