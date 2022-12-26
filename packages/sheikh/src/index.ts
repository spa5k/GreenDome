import Database from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

const sqlite = new Database('quran.db', { verbose: console.log });

const db = new Kysely({
	// Use MysqlDialect for MySQL and SqliteDialect for SQLite.
	dialect: new SqliteDialect({
		database: sqlite,
	}),
});
console.log(db);
// const main = async () => {};

// await main();
