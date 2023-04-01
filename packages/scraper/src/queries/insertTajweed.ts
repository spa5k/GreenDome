import { db } from '../db.js';
import { TajweedRes } from '../fetchers/tajweed.js';

export const insertTajweed = async (ayahs: TajweedRes[]) => {
	for (const ayah of ayahs) {
		await db.updateTable('quran').where('ayah', '=', ayah.ayah).where('surah', '=', ayah.surah).set({ 'tajweed': ayah.tajweed }).execute();
	}
	console.log('Tajweed added');
};
