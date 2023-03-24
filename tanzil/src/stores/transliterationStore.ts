import { Edition } from '@/utils/bindings.js';
import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';

type TransliterationSettingsState = {
	enabledTransliterations: Edition[];
	transliterationEnabled: boolean;
	transliterations?: Edition[];
};

type TransliterationSettingsActions = {
	changeTransliterationEditions: (edition: string) => void;
	toggleTransliteration: () => void;
	isEnabled: (edition: string) => boolean;
};

export const useTransliterationSettingsStore = create<
	TransliterationSettingsState & TransliterationSettingsActions
>((set, get) => ({
	enabledTransliterations: [],
	transliterationEnabled: true,
	transliterations: [],

	changeTransliterationEditions(updatedEdition) {
		const { enabledTransliterations } = get();
		let found = false;
		enabledTransliterations.forEach((edition) => {
			if (edition.name === updatedEdition) {
				found = true;
				return;
			}
		});
		let newEditions: Edition[];
		if (found) {
			newEditions = enabledTransliterations.filter((edition) => edition.name !== updatedEdition);
		} else {
			const { transliterations } = get();
			const newEdition = transliterations?.find((edition) => edition.name === updatedEdition);
			if (newEdition) {
				newEditions = [...enabledTransliterations, newEdition];
			}
		}
		set(() => ({ enabledTransliterations: newEditions }));
	},
	isEnabled(edition) {
		const { enabledTransliterations } = get();
		return enabledTransliterations.some((enabledEdition) => enabledEdition.name === edition);
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
	// const transliterations = finalEditions.map((edition) => edition.name);

	// If there are no editions, give up
	if (!finalEditions.length) {
		return;
	}

	// Set the enabled transliterations to the first one in the list
	const settingsStore = useTransliterationSettingsStore.getState();

	// Set the list of transliterations to the list we created
	settingsStore.transliterations = finalEditions;
};

export const useTransliterationTrackedStore = createTrackedSelector(
	useTransliterationSettingsStore,
);

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('transliterationStore', useTransliterationSettingsStore);
}
