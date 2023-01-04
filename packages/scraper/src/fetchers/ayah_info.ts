import { $fetch } from 'ohmyfetch';
import { ConvertAyah, Verse } from '../parser/ayah_info.js';

export const fetchAyahInfo = async () => {
	const verses: Verse[] = [];
	for (let index = 1; index <= 114; index++) {
		const url = `https://api.quran.com/api/v4/verses/by_chapter/${index}?language=en&words=false&page=1&per_page=350`;
		const json = await $fetch(url, {
			parseResponse: (txt) => txt,
		});
		const ayahInfo = ConvertAyah.toAyahQuranAPI(json);
		const { verses: versesApi } = ayahInfo;
		const tempVerse: Verse[] = [];
		for (const verse of versesApi) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			tempVerse.push({ ...verse, chapterNumber: index });
		}

		verses.push(...tempVerse);
	}
	return verses;
};
