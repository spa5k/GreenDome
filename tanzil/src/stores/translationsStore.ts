import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

type TranslationState = {
	enabledTranslations: string[];
	translationEnabled: boolean;
	translations?: string[];
};

type TranslationActions = {
	changeTranslationEditions: (edition: string) => void;
	toggleTranslation: () => void;
};

export const useTranslationSettingsStore = create<TranslationState & TranslationActions>((set, get) => ({
	enabledTranslations: [''],
	translationEnabled: Boolean(true),
	translations: [''],
	changeTranslationEditions(edition) {
		const enabledTranslations = get().enabledTranslations;
		const index = enabledTranslations.indexOf(edition);
		if (index === -1) {
			enabledTranslations.push(edition);
		} else {
			enabledTranslations.splice(index, 1);
		}
		set(() => ({ enabledTranslations }));
	},
	toggleTranslation() {
		set(() => ({ translationEnabled: !get().translationEnabled }));
	},
}));

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
	const translations = finalEditions.map((edition) => edition.name);
	if (!translations.length) {
		return;
	}
	const settingsStore = useTranslationSettingsStore.getState();
	settingsStore.enabledTranslations = translations;
	settingsStore.translations = translations;
};

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('translationsStore', useTranslationSettingsStore);
}

export const useTranslationTrackedStore = createTrackedSelector(
	useTranslationSettingsStore,
);
