import Database from 'better-sqlite3';
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import path from 'path';

const dbpath = path.resolve('src', 'data', 'quran.db');
console.log(dbpath);
const sqlite = new Database(dbpath);

export const db = new Kysely<DB>({
	dialect: new SqliteDialect({
		database: sqlite,
	}),
	plugins: [new CamelCasePlugin()],
});
