import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Edition, EditionsEnum } from '../../../utils/dbTypes';
import { EditionsApi } from '..';

type TranslationState = {
	enabledTranslations: Edition[];
	translationEnabled: boolean;
	translations: Edition[];
};

type TranslationActions = {
	changeTranslationEditions: (edition: string) => void;
	toggleTranslation: () => void;
	isEnabled: (edition: string) => boolean;
};

export const useTranslationSettingsStore = create<TranslationState & TranslationActions>()(
	devtools(persist((set, get) => ({
		enabledTranslations: [] as Edition[],
		translationEnabled: Boolean(true),
		translations: [],
		changeTranslationEditions(updatedEdition) {
			const { enabledTranslations } = get();
			let found = false;
			enabledTranslations.forEach((edition) => {
				if (edition.name === updatedEdition) {
					found = true;
				}
			});
			let newEditions: Edition[];
			if (found) {
				newEditions = enabledTranslations.filter((edition) => edition.name !== updatedEdition);
			} else {
				const { translations } = get();
				const newEdition = translations.find((edition) => edition.name === updatedEdition);
				if (newEdition) {
					newEditions = [...enabledTranslations, newEdition];
				}
			}
			set(() => ({ enabledTranslations: newEditions }));
		},
		isEnabled(edition) {
			const { enabledTranslations } = get();
			return enabledTranslations.some((enabledEdition) => enabledEdition.name === edition);
		},

		toggleTranslation() {
			set(() => ({ translationEnabled: !get().translationEnabled }));
		},
	}), {
		name: 'translations',
		storage: createJSONStorage(() => localStorage),
	})),
);

/**
 * @description Retrieves the available editions of the translations using the Quranic API, and sets the default edition in the Translation Settings Store.
 * @async
 * @throws {Error} If there are no Quran text editions found
 */
export const getTranslationEditions = async () => {
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions(EditionsEnum.Translation);
	if (editions.err) {
		throw editions.err;
	}
	const finalEditions = editions.val;

	if (!finalEditions.length) {
		return;
	}

	if (!finalEditions.length) {
		return;
	}
	const settingsStore = useTranslationSettingsStore.getState();
	settingsStore.translations = finalEditions;
};

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('translationsStore', useTranslationSettingsStore);
}

export const useTranslationTrackedStore = createTrackedSelector(
	useTranslationSettingsStore,
);
