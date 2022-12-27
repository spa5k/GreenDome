import { downloadSurahList } from './fetchers/chapters.js';
import { insertSurahs } from './queries/insertSurahs.js';

const main = async () => {
	const data = await downloadSurahList();
	insertSurahs(data.chapters);
	// console.log(data);
};
await main();
