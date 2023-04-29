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

const blackList = [
	'ara_quranacademy',
	'ara_quranbazzi',
	'ara_qurandoori',
	'ara_qurandoorinonun',
	'ara_qurankhaledhosn',
];

export const insertQuranEditions = async () => {
	const names = await db.selectFrom('editions').where('type', '=', 'quran').select(['name']).execute();
	console.log(names);
	for (const name of names) {
		if (blackList.includes(name.name)) {
			continue;
		}
		const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${name.name}.json`;
		const data: QuranEdition = await $fetch(url);
		const verses = data.quran;
		for (const verse of verses) {
			await db.insertInto('quran').values({
				ayah: verse.verse,
				key: name.name,
				surah: verse.chapter,
				text: verse.text,
			}).execute();
		}
	}
	console.log('added quran text');
};
