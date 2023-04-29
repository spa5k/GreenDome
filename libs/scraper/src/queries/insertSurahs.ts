import { db } from '../db.js';
import { Chapter } from '../parser/surah.js';

export const insertSurahs = async (surahs: Chapter[]) => {
	let ayahStart = 0;
	for (const surah of surahs) {
		const ayahEnd = ayahStart + surah.versesCount;
		const pageStart = surah.pages[0];
		const pageEnd = surah.pages[1];

		const final = {
			ayahEnd: ayahEnd,
			ayahStart: ayahStart,
			pageEnd,
			pageStart,
			type: surah.revelationPlace,
			bismillahPre: surah.bismillahPre ? 'true' : 'false',
			nameArabic: surah.nameArabic,
			nameComplex: surah.nameComplex,
			nameSimple: surah.nameSimple,
			revelationOrder: surah.revelationOrder,
			surahId: surah.id,
		};
		await db.insertInto('surahs').values(final).execute();
		ayahStart = ayahEnd;
	}
	console.log('Surah Added');
};
