import { Editions } from 'kysely-codegen';
import { db } from '../db.js';

export const insertEditions = async (data: Editions[]) => {
	for (const edition of data) {
		await db.insertInto('editions').values({
			language: edition.language,
			name: edition.name,
			type: edition.type,
			author: edition.author,
			direction: edition.direction,
			source: edition.source,
			enabled: edition.enabled,
		}).execute();
	}
	console.log('editions added');
};
