export interface Quran {
	quran: QuranElement[];
}

export interface QuranElement {
	chapter: number;
	verse: number;
	text: string;
}
