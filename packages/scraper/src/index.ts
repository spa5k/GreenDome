import { downloadSurahList } from './fetchers/chapters.js';
import { fetchEditions } from './fetchers/editions.js';
import { insertEditions } from './queries/insertEditions.js';
import { insertQuranEditions } from './queries/insertQuranTextFromEditions.js';
import { insertSurahs } from './queries/insertSurahs.js';
import { insertTranslations } from './queries/insertTranslations.js';

const main = async () => {
	const surahs = await downloadSurahList();
	await insertSurahs(surahs.chapters);
	// const tajweed = await fetchTajweed();
	// await insertTajweed(tajweed);
	// const ayahInfo = await fetchAyahInfo();
	// await insertAyahInfo(ayahInfo);
	const editions = await fetchEditions();
	await insertEditions(editions);
	await insertQuranEditions();
	await insertTranslations();
};
await main();
