import Database from 'better-sqlite3';
import path from 'path';

const prepareColumns = `	SELECT
    zstd_enable_transparent('{"table": "quran", "column": "text", "compression_level": 21, "dict_chooser": "''a''"}'),
    zstd_enable_transparent('{"table": "translations_text", "column": "translation_text", "compression_level": 21, "dict_chooser": "''b''"}');
		`;
const runMaintainece = `
select zstd_incremental_maintenance(null, 1);`;

export const compress = async () => {
	const dbpath = path.resolve();
	const root = path.resolve(dbpath, '../', '../', './iqra', './data', 'quran.db');
	const extensionPath = path.resolve(dbpath, '../', '../', './iqra', 'sqlite_zstd.dll');

	const sqlite = new Database(root);
	sqlite.loadExtension(extensionPath);

	try {
		sqlite.exec(prepareColumns);
	} catch (err) {
		console.error(err);
	}
	try {
		sqlite.exec(runMaintainece);
	} catch (err) {
		console.error(err);
	}
};

await compress();
