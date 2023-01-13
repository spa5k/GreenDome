import { Edition, EditionsEnum } from '@/utils/bindings.js';
import { useRspcQuery } from '@/utils/rspc.js';
import { useQuery } from '@tanstack/react-query';
import { $fetch } from 'ohmyfetch';

abstract class EditionsAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract useEditionsList(editionType: EditionsEnum): {
		data: Edition[] | undefined;
		isLoading: boolean;
		error: unknown;
	};
}

class TauriApi extends EditionsAbstract {
	public useEditionsList(editionType: EditionsEnum) {
		const { data, isLoading, error } = useRspcQuery(['editions', { edition: editionType }]);

		if (!isLoading) {
			return { data, isLoading, error };
		}
		return { data, isLoading, error };
	}
}

class QuranApi extends EditionsAbstract {
	public useEditionsList(editionType: EditionsEnum) {
		const { data, isLoading, error } = useQuery(['editions'], async () => {
			return await $fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json');
		});

		if (!isLoading) {
			const formattedData = this.formatData(data, editionType);
			return { data: formattedData, isLoading, error };
		}
		return { data, isLoading, error };
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
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

	public useAyahs(id: number, edition: string) {
		const { data, isLoading, error } = useRspcQuery(['ayahs', { edition: edition, number: id }]);
		if (!isLoading) {
			return { data, isLoading, error };
		}

		return { data, isLoading, error };
	}
}

export class EditionsApi extends EditionsAbstract {
	helper = this.isTauri ? new TauriApi() : new QuranApi();
	public useEditionsList(editionType: EditionsEnum) {
		return this.helper.useEditionsList(editionType);
	}
}

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

enum Type {
	TRANSLATION = 'translation',
	QURAN = 'quran',
	TRANSLITERATION = 'transliteration',
	QURAN_TRANSLITERATION = 'quran_transliteration',
}
