/* eslint-disable @typescript-eslint/no-explicit-any */
import { $fetch } from 'ohmyfetch';
import { db } from '../db.js';

export interface QuranEdition {
	quran: Quran[];
}

export interface Quran {
	chapter: number;
	verse: number;
	text: string;
}

export const insertTranslations = async () => {
	const names = await db.selectFrom('editions').where('type', '=', 'translation').where('enabled', '=', 'true').select([
		'name',
	]).execute();

	for (const name of names) {
		console.log(name);
		const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${name.name}.json`;
		const data: QuranEdition = await $fetch(url);
		const verses = data.quran;
		for (const verse of verses) {
			await db.insertInto('translationsText').values({
				ayah: verse.verse,
				key: name.name,
				surah: verse.chapter,
				translationText: verse.text,
			}).execute();
		}
	}

	console.log('added translation text');
};
