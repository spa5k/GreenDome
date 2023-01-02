import { $fetch } from 'ohmyfetch';
import { ConvertAyah } from '../parser/ayah_info.js';

export const fetchAyahInfo = async () => {
	for (let index = 1; index <= 114; index++) {
		const url = `https://api.quran.com/api/v4/verses/by_chapter/${index}?language=en&words=false&page=1&per_page=300`;
		const json = await $fetch(url, {
			parseResponse: (txt) => txt,
		});
		const ayahInfo = ConvertAyah.toAyahQuran(json);

		return ayahInfo.verses;
	}
};
