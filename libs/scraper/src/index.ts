import { fetchAyahInfo } from './fetchers/ayah_info.js';
import { downloadSurahList } from './fetchers/chapters.js';
import { fetchEditions } from './fetchers/editions.js';
import { insertAyahInfo } from './queries/insertAyahInfo.js';
import { insertEditions } from './queries/insertEditions.js';
import { insertQuranEditions } from './queries/insertQuranTextFromEditions.js';
import { insertRecitations } from './queries/insertRecitations.js';
import { insertSurahs } from './queries/insertSurahs.js';
import { insertTranslations } from './queries/insertTranslations.js';

// We still need to fix Tajweed addition.
const main = async () => {
	const surahs = await downloadSurahList();
	await insertSurahs(surahs.chapters);
	const ayahInfo = await fetchAyahInfo();
	await insertAyahInfo(ayahInfo);
	const editions = await fetchEditions();
	await insertEditions(editions);
	await insertQuranEditions();
	await insertTranslations();
	insertRecitations();
};
await main();
