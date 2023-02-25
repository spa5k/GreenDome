// This file was generated by [rspc](https://github.com/oscartbeaumont/rspc). Do not edit this file manually.

export type Procedures = {
	queries:
		| { key: 'ayahs'; input: TranslationEdition; result: Array<Ayah>; }
		| { key: 'editions'; input: EditionsType; result: Array<Edition>; }
		| { key: 'surah_info'; input: number; result: Surahs; }
		| { key: 'surah_list'; input: never; result: Array<Surahs>; }
		| { key: 'translations'; input: TranslationEdition; result: Array<Ayah>; }
		| { key: 'version'; input: never; result: string; };
	mutations: never;
	subscriptions: never;
};

export interface Ayah {
	ayah: number;
	surah: number;
	text: string;
}

export interface Edition {
	id: number;
	name: string;
	author: string | null;
	language: string;
	direction: string;
	source: string | null;
	type: string;
	enabled: string;
}

export type EditionsEnum = 'Quran' | 'Translation' | 'Transliteration';

export interface EditionsType {
	edition: EditionsEnum;
}

export interface Surahs {
	id: number;
	revelationOrder: number;
	reveleationPlace: 'makkah' | 'madinah';
	bismillahPre: string;
	nameSimple: string;
	nameComplex: string;
	nameArabic: string;
	ayahStart: number;
	ayahEnd: number;
	pageStart: number;
	pageEnd: number;
}

export interface TranslationEdition {
	edition: string;
	number: number;
}
