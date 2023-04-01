/* eslint-disable @typescript-eslint/ban-ts-comment */
import { writeFile } from 'fs/promises';
import { $fetch } from 'ohmyfetch';
import { Quran } from '../parser/quran.js';

const sources = ['ara-quranindopak', 'ara-quranuthmanihaf', 'ara-quranwarsh', 'ara-quranqaloon', 'ara-quransimple'];

const sourceKey: Record<string, string> = {
	'ara-quranindopak': 'indopak',
	'ara-quranuthmanihaf': 'uthmani',
	'ara-quranwarsh': 'warsh',
	'ara-quranqaloon': 'unicode',
	'ara-quransimple': 'simple',
};

export interface QuranText {
	surah: number;
	ayah: number;
	indopak: string;
	uthmani: string;
	unicode: string;
	simple: string;
	warsh: string;
	tajweed: string | null;
}
const FinalRes: QuranText[] = [];

export const fetchQuranText = async (): Promise<QuranText[]> => {
	for (let index = 0; index < 1; index++) {
		const source = sources[index];
		const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${source}.json`;
		const data: Quran = await $fetch(url);
		for (const ayah of data.quran) {
			// @ts-ignore
			FinalRes.push({ ayah: ayah.verse, surah: ayah.chapter });
		}
	}
	for (const source of sources) {
		const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${source}.json`;
		const data: Quran = await $fetch(url);

		for (let index = 0; index < FinalRes.length; index++) {
			const key = sourceKey[source];
			const ayah = data.quran[index];

			// @ts-ignore
			FinalRes[index][key] = ayah.text;
		}
	}
	writeFile('./index.json', JSON.stringify(FinalRes));
	return FinalRes;
};
