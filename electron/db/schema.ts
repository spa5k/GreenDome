import { Selectable } from "kysely";

export interface AyahTable {
  id: number;
  surahNumber: number;
  ayahNumber: number;
  editionId: number;
  text: string;
}

export interface AyahInfoTable {
  id: number;
  surahNumber: number;
  ayahNumber: number;
  ayahKey: string;
  hizb: number;
  rubElHizb: number;
  ruku: number;
  manzil: number;
  page: number;
  juz: number;
}

export interface EditionTable {
  id: number;
  name: string;
  author: string | null;
  language: string;
  direction: string;
  source: string | null;
  interface: string;
  type: string;
  enabled: number;
}

export interface JuzTable {
  id: number;
  juzNumber: number;
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
}

export interface SajdahTable {
  id: number;
  surahNumber: number;
  ayahNumber: number;
  sajdahNumber: number;
}

export interface SurahTable {
  id: number;
  surahNumber: number;
  nameSimple: string;
  nameComplex: string;
  nameArabic: string;
  ayahStart: number;
  ayahEnd: number;
  revelationPlace: string;
  pageStart: number;
  pageEnd: number;
}

export interface TranslationTable {
  id: number;
  surahNumber: number;
  ayahNumber: number;
  editionId: number;
  text: string;
  juzNumber: number | null;
}

export interface TajweedTable {
  id: number;
  surahNumber: number;
  ayahNumber: number;
  tajweed: string;
}

export type Ayah = Selectable<AyahTable>;
export type AyahInfo = Selectable<AyahInfoTable>;
export type Edition = Selectable<EditionTable>;
export type Juz = Selectable<JuzTable>;
export type Sajdah = Selectable<SajdahTable>;
export type Surah = Selectable<SurahTable>;
export type Translation = Selectable<TranslationTable>;
export type Tajweed = Selectable<TajweedTable>;

export interface Database {
  ayah: AyahTable;
  ayahInfo: AyahInfoTable;
  edition: EditionTable;
  juz: JuzTable;
  sajdah: SajdahTable;
  surah: SurahTable;
  translation: TranslationTable;
  tajweed: TajweedTable;
}
