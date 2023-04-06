import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;

export interface _SqlxMigrations {
	version: string | null;
	description: string;
	installedOn: Generated<string>;
	success: number;
	// @ts-ignore
	checksum: Buffer;
	executionTime: string;
}

export interface AyahInfo {
	id: Generated<number>;
	surah: number;
	ayah: number;
	ayahKey: string;
	hizb: number;
	rubElHizb: number;
	ruku: number;
	manzil: number;
	page: number;
	juz: number;
}

export interface Editions {
	id: Generated<number>;
	name: string;
	author: string | null;
	language: string;
	direction: string;
	source: string | null;
	type: string;
	enabled: string;
}

export interface Quran {
	id: Generated<number>;
	surah: number;
	ayah: number;
	key: string;
	text: string;
}

export interface Recitations {
	reciterName: string | null;
	surahNumber: number | null;
	ayahNumber: number | null;
	recitationQuality: string | null;
}

export interface Surahs {
	id: Generated<number>;
	revelationOrder: number;
	bismillahPre: string;
	nameSimple: string;
	nameComplex: string;
	nameArabic: string;
	ayahStart: number;
	ayahEnd: number;
	type: string;
	pageStart: number;
	pageEnd: number;
	surahId: number;
}

export interface TranslationsText {
	id: Generated<number>;
	surah: number;
	ayah: number;
	key: string;
	translationText: string | null;
}

export interface DB {
	_SqlxMigrations: _SqlxMigrations;
	ayahInfo: AyahInfo;
	editions: Editions;
	quran: Quran;
	recitations: Recitations;
	surahs: Surahs;
	translationsText: TranslationsText;
}
