import { db } from '../db.js';
import { Verse } from '../parser/ayah_info.js';

export const insertAyahInfo = async (ayahs: Verse[]) => {
	for (const ayah of ayahs) {
		await db.insertInto('ayahInfo').values({
			ayah: ayah.verseNumber,
			ayahKey: ayah.verseKey,
			hizb: ayah.hizbNumber,
			id: ayah.id,
			juz: ayah.juzNumber,
			manzil: ayah.manzilNumber,
			page: ayah.pageNumber,
			rubElHizb: ayah.rubElHizbNumber,
			ruku: ayah.rukuNumber,
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			surah: ayah.chapterNumber,
		}).execute();
	}
	console.log('Ayah Info added');
};
