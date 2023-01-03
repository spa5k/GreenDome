import { Tajweed } from 'tajweed-ts';
import { db } from '../db.js';
import { TajweedRes } from '../fetchers/tajweed.js';

export const insertTajweed = async (ayahs: TajweedRes[]) => {
	const parseTajweed = new Tajweed();
	for (const ayah of ayahs) {
		const parseString = parseTajweed.parse(ayah.tajweed, true);
		await db.updateTable('quran').where('ayah', '=', ayah.ayah).where('surah', '=', ayah.surah).set({ 'tajweed': parseString }).execute();
	}
	console.log('Tajweed added');
};
