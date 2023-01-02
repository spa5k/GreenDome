import { $fetch } from 'ohmyfetch/undici';
import { ConvertSurah, Surahs } from '../parser/index.js';

export const downloadSurahList = async (): Promise<Surahs> => {
	const json = await $fetch(`https://api.quran.com/api/v4/chapters`, {
		parseResponse: (txt) => txt,
	});
	const surahs = ConvertSurah.toSurahs(json);

	return surahs;
};
