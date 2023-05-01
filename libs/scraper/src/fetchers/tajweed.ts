import { $fetch } from 'ohmyfetch';

interface Tajweed {
	code: number;
	status: string;
	data: Data;
}

interface Data {
	surahs: Surah[];
	edition: Edition;
}

interface Edition {
	identifier: string;
	language: string;
	name: string;
	englishName: string;
	format: string;
	type: string;
}

interface Surah {
	number: number;
	name: string;
	englishName: string;
	englishNameTranslation: string;
	revelationType: RevelationType;
	ayahs: Ayah[];
}

interface Ayah {
	number: number;
	text: string;
	numberInSurah: number;
	juz: number;
	manzil: number;
	page: number;
	ruku: number;
	hizbQuarter: number;
	sajda: boolean | SajdaClass;
}

interface SajdaClass {
	id: number;
	recommended: boolean;
	obligatory: boolean;
}

enum RevelationType {
	Meccan = 'Meccan',
	Medinan = 'Medinan',
}

export interface TajweedRes {
	ayah: number;
	surah: number;
	tajweed: string;
}

export const fetchTajweed = async (): Promise<TajweedRes[]> => {
	const data: Tajweed = await $fetch(`https://api.alquran.cloud/v1/quran/quran-tajweed`);
	const { surahs } = data.data;
	const finalRes: TajweedRes[] = [];
	for (const surah of surahs) {
		for (const ayah of surah.ayahs) {
			const res: TajweedRes = {
				surah: surah.number,
				ayah: ayah.numberInSurah,
				tajweed: ayah.text,
			};

			finalRes.push(res);
		}
	}
	return finalRes;
};
