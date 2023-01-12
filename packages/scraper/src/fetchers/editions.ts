/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Editions } from 'kysely-codegen';
import { $fetch } from 'ohmyfetch';

interface EditionsApi {
	name: string;
	author: string;
	language: string;
	direction: Direction;
	source: string;
	comments: string;
	link: string;
	linkmin: string;
}

enum Direction {
	LTR = 'ltr',
	RTL = 'rtl',
}
enum Type {
	TRANSLATION = 'translation',
	QURAN = 'quran',
	TRANSLITERATION = 'transliteration',
	QURAN_TRANSLITERATION = 'quran_transliteration',
}

// export interface Editions {
// 	name: string;
// 	author: string;
// 	language: string;
// 	direction: Direction;
// 	source?: string;
// 	type: Type;
// 	enabled: boolean;
// }

const getEdition = (string: string) => {
	const quranTransliteration = /^ara_quran.*la$/;
	const quranRegex = /^ara_quran(?!.*(la\d*)$)/;
	const genericTransliteration = /^(?!ara_quran).*(la$|la*$)/;
	if (string.match(quranTransliteration) || string.startsWith('ara_quran') && string.includes('la')) {
		return Type.QURAN_TRANSLITERATION;
	}
	if (string.match(quranRegex) || string.startsWith('ara_quran') && !string.includes('la')) {
		return Type.QURAN;
	}
	if (string.match(genericTransliteration) && !string.startsWith('ara_quran') && string.includes('la')) {
		return Type.TRANSLITERATION;
	}
	return Type.TRANSLATION;
};

const blackList = ['ara_quranphoneticst', 'eng_literal'];

const enableList = [
	'urd-muhammadhussain',
	'spa-islamicfoundati',
	'zho-mazhonggang-la',
	'eng-abdelhaleem',
];

export const fetchEditions = async () => {
	const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json';
	const json = await $fetch(url);
	const editions: string[] = Object.keys(json);
	const finalEditions: Editions[] = [];

	for (let index = 0; index < editions.length; index++) {
		const edition = editions[index];
		const editionInfo: EditionsApi = json[edition];
		// @ts-ignore
		const editionFinal: Editions = {
			author: editionInfo?.author || '',
			direction: editionInfo.direction,
			language: editionInfo.language,
			name: editionInfo.name,
			type: getEdition(edition),
			source: editionInfo.source,
			enabled: enableList.includes(editionInfo.name) ? 'true' : 'false',
		};

		if (!blackList.includes(edition)) {
			finalEditions.push(editionFinal);
		}
	}
	return finalEditions;
};
