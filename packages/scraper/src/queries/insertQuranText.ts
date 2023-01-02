import { db } from '../db.js';
import { QuranText } from '../fetchers/quran.js';

export const insertQuranText = async (ayahs: QuranText[]) => {
	for (const ayah of ayahs) {
		await db.insertInto('quran').values(ayah).execute();
	}
};
