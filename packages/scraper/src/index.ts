import { fetchTajweed } from './fetchers/tajweed.js';
import { insertTajweed } from './queries/insertTajweed.js';

const main = async () => {
	// const surahs = await downloadSurahList();
	// await insertSurahs(surahs.chapters);
	// const quranText = await fetchQuranText();
	// await insertQuranText(quranText);
	const tajweed = await fetchTajweed();
	await insertTajweed(tajweed);
	// const ayahInfo = await fetchAyahInfo();
	// await insertAyahInfo(ayahInfo);
};
await main();
