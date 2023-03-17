import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

type TransliterationSettingsState = {
	enabledTransliterations: string[];
	transliterationEnabled: boolean;
	transliterations?: string[];
};

type TransliterationSettingsActions = {
	changeTransliterationEditions: (edition: string) => void;
	toggleTransliteration: () => void;
};

export const useTransliterationSettingsStore = create<
	TransliterationSettingsState & TransliterationSettingsActions
>((set, get) => ({
	enabledTransliterations: [],
	transliterationEnabled: true,
	transliterations: [],

	changeTransliterationEditions(edition) {
		const enabledTransliterations = get().enabledTransliterations;
		const index = enabledTransliterations.indexOf(edition);
		if (index === -1) {
			enabledTransliterations.push(edition);
		} else {
			enabledTransliterations.splice(index, 1);
		}
		set({ enabledTransliterations: [...enabledTransliterations] });
	},

	toggleTransliteration() {
		set((state) => ({ transliterationEnabled: !state.transliterationEnabled }));
	},
}));

/**
 * @description Retrieves the available editions of the transliterations using the Quranic API, and sets the default edition in the Transliteration Settings Store.
 * @async
 * @throws {Error} If there are no Quran text editions found
 */
export const getTransliterationEditions = async () => {
	// Get a list of all editions with the name "Transliteration"
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions(EditionsEnum.Transliteration);

	if (editions.err) {
		throw editions.err;
	}
	const finalEditions = editions.val;

	// If there are no editions, give up
	if (!finalEditions.length) {
		return;
	}

	// Get the name of each edition
	const transliterations = finalEditions.map((edition) => edition.name);

	// If there are no editions, give up
	if (!transliterations.length) {
		return;
	}

	// Set the enabled transliterations to the first one in the list
	const settingsStore = useTransliterationSettingsStore.getState();
	settingsStore.enabledTransliterations = [transliterations[0]];
	// Set the list of transliterations to the list we created
	settingsStore.transliterations = transliterations;
};

export const useTransliterationTrackedStore = createTrackedSelector(
	useTransliterationSettingsStore,
);

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('transliterationStore', useTransliterationSettingsStore);
}
