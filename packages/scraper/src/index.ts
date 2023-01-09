// import { fetchAyahInfo } from './fetchers/ayah_info.js';
// import { downloadSurahList } from './fetchers/chapters.js';
// import { fetchQuranText } from './fetchers/quran.js';
// import { fetchTajweed } from './fetchers/tajweed.js';
// import { insertAyahInfo } from './queries/insertAyahInfo.js';
// import { insertQuranText } from './queries/insertQuranText.js';
// import { insertSurahs } from './queries/insertSurahs.js';
// import { insertTajweed } from './queries/insertTajweed.js';

import { compress } from './compress.js';

// const main = async () => {
// 	const surahs = await downloadSurahList();
// 	await insertSurahs(surahs.chapters);
// 	const quranText = await fetchQuranText();
// 	await insertQuranText(quranText);
// 	const tajweed = await fetchTajweed();
// 	await insertTajweed(tajweed);
// 	const ayahInfo = await fetchAyahInfo();
// 	await insertAyahInfo(ayahInfo);
// };
// await main();

await compress();
