import { Edition, EditionsEnum } from '@/utils/bindings.js';

/**
 * @param edition - The string to be matched against the regexes
 * @returns The Type of the edition
 * @description
 * - If the edition starts with 'ara_quran' and includes 'la', then it is a quran transliteration
 * - If the edition starts with 'ara_quran' and does not include 'la', then it is a quran
 * - If the edition does not start with 'ara_quran' and includes 'la', then it is a transliteration
 * - Otherwise, it is a translation
 * - returns the Type of the string
 */
export const getEditionType = (edition: string) => {
	const isQuranTransliteration = /^ara_quran.*la$/;
	const isGenericTransliteration = /^(?!ara_quran).*(la$|la*$)/;
	const isQuran = /^ara_quran(?!.*(la\d*)$)/;
	if (edition.match(isQuranTransliteration) || edition.startsWith('ara_quran') && edition.includes('la')) {
		return EditionType.QURAN_TRANSLITERATION;
	}
	if (edition.match(isQuran) || edition.startsWith('ara_quran') && !edition.includes('la')) {
		return EditionType.QURAN;
	}
	if (edition.match(isGenericTransliteration) && !edition.startsWith('ara_quran') && edition.includes('la')) {
		return EditionType.TRANSLITERATION;
	}
	return EditionType.TRANSLATION;
};

export enum EditionType {
	TRANSLATION = 'translation',
	QURAN = 'quran',
	TRANSLITERATION = 'transliteration',
	QURAN_TRANSLITERATION = 'quran_transliteration',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatEditionsData = (editionsData: { [x: string]: any; }, editionType: EditionsEnum): Edition[] => {
	const editions: string[] = Object.keys(editionsData);
	const finalEditions: Edition[] = [];

	for (let index = 0; index < editions.length; index++) {
		const edition = editions[index];
		const editionInfo = editionsData[edition];

		const keys: Record<EditionType, EditionsEnum> = {
			quran: EditionsEnum.Quran,
			quran_transliteration: EditionsEnum.Transliteration,
			translation: EditionsEnum.Translation,
			transliteration: EditionsEnum.Transliteration,
		};
		const editionVariant = getEditionType(edition);
		if (keys[editionVariant] !== editionType) {
			continue;
		}

		const editionFinal: Edition = {
			author: editionInfo?.author || '',
			direction: editionInfo.direction,
			language: editionInfo.language,
			name: editionInfo.name,
			type: editionVariant,
			source: editionInfo.source,
			enabled: 'true',
			id: index + 1,
		};

		finalEditions.push(editionFinal);
	}
	return finalEditions;
};
