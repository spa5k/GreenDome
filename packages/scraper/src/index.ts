import { downloadSurahList } from './fetchers/chapters.js';
import { insertSurahs } from './queries/insertSurahs.js';

const main = async () => {
	const data = await downloadSurahList();
	await insertSurahs(data.chapters);
	// const data = await fetchQuranText();
	// await insertQuranText(data);
};
await main();
