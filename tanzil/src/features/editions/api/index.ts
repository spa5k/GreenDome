/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edition, EditionsEnum } from '@/utils/bindings.js';

abstract class EditionsAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract getEditions(editionType: EditionsEnum): Promise<Edition[]>;
}

export class TauriApi extends EditionsAbstract {
	public async getEditions(editionType: EditionsEnum): Promise<Edition[]> {
		const { client } = await import('@/utils/rspc');

		return await client.query(['editions', { edition: editionType }]);
	}
}

class QuranApi extends EditionsAbstract {
	public async getEditions(editionType: EditionsEnum): Promise<Edition[]> {
		const { $fetch } = await import('ohmyfetch');
		const data = await $fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json');
		const formattedData = this.formatData(data, editionType);

		return formattedData;
	}

	formatData(editionsData: any, editionType: EditionsEnum): Edition[] {
		const editions: string[] = Object.keys(editionsData);
		const finalEditions: Edition[] = [];

		for (let index = 0; index < editions.length; index++) {
			const edition = editions[index];
			const editionInfo = editionsData[edition];

			const keys: Record<Type, EditionsEnum> = {
				quran: 'Quran',
				quran_transliteration: 'Transliteration',
				translation: 'Translation',
				transliteration: 'Transliteration',
			};
			const editionVariant = getEdition(edition);
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
	}
}
/**
 * @param editionType - The type of the edition
 * @returns The editions of the given type
 * @description
 * - If the app is running in tauri, then use the TauriApi class to get the editions
 * - Otherwise, use the QuranApi class to get the editions
 * - returns the editions of the given type
 * @example
 * ```ts
 * const editionsApi = new EditionsApi();
 * const editions = await editionsApi.getEditions('Quran');
 * ```
 * @summary
	1. Since the code is written in typescript, we have to import the typescript bindings.
	2. The EditionsAbstract class is an abstract class that defines the interface for the EditionsApi class.
	3. The TauriApi class extends the EditionsAbstract class and implements the getEditions function.
	4. The QuranApi class extends the EditionsAbstract class and implements the getEditions function.
	5. The EditionsApi class extends the EditionsAbstract class and implements the getEditions function.
	6. The getEdition function returns the Type of the edition.
	7. The Type enum is an enum that defines the types of the quran editions.
 */
export class EditionsApi extends EditionsAbstract {
	helper = this.isTauri ? new TauriApi() : new QuranApi();
	/**
	 * Gets the editions of a given type.
	 * @param {EditionsEnum} editionType The type of editions to get.
	 * @returns {Edition[]} The editions of the given type.
	 */
	public getEditions(editionType: EditionsEnum): Promise<Edition[]> {
		return this.helper.getEditions(editionType);
	}
}

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
const getEdition = (edition: string): Type => {
	const isQuranTransliteration = /^ara_quran.*la$/;
	const isGenericTransliteration = /^(?!ara_quran).*(la$|la*$)/;
	const isQuran = /^ara_quran(?!.*(la\d*)$)/;
	if (edition.match(isQuranTransliteration) || edition.startsWith('ara_quran') && edition.includes('la')) {
		return Type.QURAN_TRANSLITERATION;
	}
	if (edition.match(isQuran) || edition.startsWith('ara_quran') && !edition.includes('la')) {
		return Type.QURAN;
	}
	if (edition.match(isGenericTransliteration) && !edition.startsWith('ara_quran') && edition.includes('la')) {
		return Type.TRANSLITERATION;
	}
	return Type.TRANSLATION;
};

enum Type {
	TRANSLATION = 'translation',
	QURAN = 'quran',
	TRANSLITERATION = 'transliteration',
	QURAN_TRANSLITERATION = 'quran_transliteration',
}
