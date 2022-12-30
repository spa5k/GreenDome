import Database from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import path from 'path';

// lol
const dbpath = path.resolve();
const root = path.resolve(dbpath, '../', '../', './iqra', './data', 'quran.db');

const sqlite = new Database(root);

export const db = new Kysely<DB>({
	dialect: new SqliteDialect({
		database: sqlite,
	}),
	plugins: [new CamelCasePlugin()],
});
