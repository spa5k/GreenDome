import { insertRecitations } from './queries/insertRecitations.js';

// We still need to fix Tajweed addition.
const main = async () => {
	// const surahs = await downloadSurahList();
	// await insertSurahs(surahs.chapters);
	// const ayahInfo = await fetchAyahInfo();
	// await insertAyahInfo(ayahInfo);
	// const editions = await fetchEditions();
	// await insertEditions(editions);
	// await insertQuranEditions();
	// await insertTranslations();
	await insertRecitations();
};
await main();
