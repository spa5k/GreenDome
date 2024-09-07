export interface QuranData {
  readonly verses: Verses;
  readonly chapters: Chapter[];
  readonly sajdas: Sajdas;
  readonly rukus: Rukus;
  readonly pages: Pages;
  readonly manzils: Manzils;
  readonly maqras: Maqras;
  readonly juzs: Juzs;
}

export interface Chapter {
  readonly chapter: number;
  readonly name: string;
  readonly englishname: string;
  readonly arabicname: string;
  readonly revelation: string;
  readonly verses: Verse[];
}

export enum Revelation {
  Madina = "Madina",
  Mecca = "Mecca",
}

export interface Verse {
  readonly verse: number;
  readonly line: number;
  readonly juz: number;
  readonly manzil: number;
  readonly page: number;
  readonly ruku: number;
  readonly maqra: number;
  readonly sajda: boolean | SajdaClass;
}

export interface SajdaClass {
  readonly no: number;
  readonly recommended: boolean;
  readonly obligatory: boolean;
}

export interface Juzs {
  readonly count: number;
  readonly references: JuzsReference[];
}

export interface JuzsReference {
  readonly name: string;
  readonly name_complex: string;
  readonly arabic_name: string;
  readonly juz: number;
  readonly translation: string;
  readonly start: End;
  readonly end: End;
}

export interface End {
  readonly chapter: number;
  readonly verse: number;
}

export interface Manzils {
  readonly count: number;
  readonly references: ManzilsReference[];
}

export interface ManzilsReference {
  readonly manzil: number;
  readonly start: End;
  readonly end: End;
}

export interface Maqras {
  readonly count: number;
  readonly references: MaqrasReference[];
}

export interface MaqrasReference {
  readonly maqra: number;
  readonly start: End;
  readonly end: End;
}

export interface Pages {
  readonly count: number;
  readonly references: PagesReference[];
}

export interface PagesReference {
  readonly page: number;
  readonly start: End;
  readonly end: End;
}

export interface Rukus {
  readonly count: number;
  readonly references: RukusReference[];
}

export interface RukusReference {
  readonly ruku: number;
  readonly start: End;
  readonly end: End;
}

export interface Sajdas {
  readonly count: number;
  readonly references: SajdasReference[];
}

export interface SajdasReference {
  readonly sajda: number;
  readonly chapter: number;
  readonly verse: number;
  readonly recommended: boolean;
  readonly obligatory: boolean;
}

export interface Verses {
  readonly count: number;
}

export interface AyahAPI {
  id: number;
  surahNumber: number;
  ayahNumber: number;
  text: string;
}
