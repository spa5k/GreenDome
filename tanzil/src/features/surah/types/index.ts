/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
// To parse this data:
//
//   import { ConvertSurah } from "./file";
//
//   const surah = ConvertSurah.toSurah(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Surah {
	ayahEnd: number;
	ayahStart: number;
	bismillahPre: string;
	id: number;
	nameArabic: string;
	nameComplex: string;
	nameSimple: string;
	pageEnd: number;
	pageStart: number;
	revelationOrder: number;
	reveleationPlace: 'makkah' | 'madinah';
}

export interface SurahQuranAPI {
	chapters: Chapter[];
}

export interface Chapter {
	id: number;
	revelation_place: RevelationPlace;
	revelation_order: number;
	bismillah_pre: boolean;
	name_simple: string;
	name_complex: string;
	name_arabic: string;
	verses_count: number;
	pages: number[];
	translated_name: TranslatedName;
}

export enum RevelationPlace {
	Madinah = 'madinah',
	Makkah = 'makkah',
}

export interface TranslatedName {
	language_name: LanguageName;
	name: string;
}

export enum LanguageName {
	English = 'english',
}
