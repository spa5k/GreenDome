import { useQuranTextSettingsStore } from '@/stores/quranStore.js';
import { useRecitationStore } from '@/stores/recitationStore.js';
import { useSidebarStore } from '@/stores/sidebarsStore.js';
import { useTranslationSettingsStore } from '@/stores/translationsStore.js';
import { useTransliterationSettingsStore } from '@/stores/transliterationStore.js';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const getQuranTextEditions = async () => {
	// Get a list of all editions with the name "Quran"
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions('Quran');
	// If there are no editions, give up
	if (!editions.length) {
		return;
	}
	const quranTextEditions = editions.map((edition) => edition.name);

	if (!quranTextEditions.length) {
		return;
	}
	// Store the list of Quran text editions in the settings store
	const settingsStore = useQuranTextSettingsStore.getState();
	settingsStore.quranTextEditions = quranTextEditions;
	settingsStore.enabledQuranTextEdition = settingsStore.enabledQuranTextEdition || quranTextEditions[0];
};

const getTranslationEditions = async () => {
	// Get a list of all editions with the name "Translation"
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions('Translation');
	// If there are no editions, give up
	if (!editions.length) {
		return;
	}
	// Get the names of the editions
	const translations = editions.map((edition) => edition.name);
	if (!translations.length) {
		return;
	}
	// Get the state of the translation settings store
	const settingsStore = useTranslationSettingsStore.getState();
	// Set the enabled translations to the first edition
	settingsStore.enabledTranslations = translations;
	// Set the translation names to the list of editions
	settingsStore.translations = translations;
};

const getTransliterationEditions = async () => {
	// Get a list of all editions with the name "Transliteration"
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions('Transliteration');

	// If there are no editions, give up
	if (!editions.length) {
		return;
	}

	// Get the name of each edition
	const transliterations = editions.map((edition) => edition.name);

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

export const useSettingsStore = create(
	combine(
		{
			translationSettings: useTranslationSettingsStore,
			transliterationSettings: useTransliterationSettingsStore,
			quranSettings: useQuranTextSettingsStore,
			sidebarSettings: useSidebarStore,
			recitationSettings: useRecitationStore,
		},
		(set, get) => ({
			// Here you can define any derived state or actions that combine data from multiple stores.
			// For example:
			getEnabledTranslations: () => {
				const translationSettings = get().translationSettings;
				const enabledTranslations = translationSettings().enabledTranslations;
				const translations = translationSettings().translations;
				return enabledTranslations.map((enabledTranslation) => {
					return translations?.find((translation) => translation === enabledTranslation);
				});
			},
			getEnabledTransliterations: () => {
				const transliterationSettings = get().transliterationSettings;
				const enabledTransliterations = transliterationSettings().enabledTransliterations;
				const transliterations = transliterationSettings().transliterations;
				return enabledTransliterations.map((enabledTransliteration) => {
					return transliterations?.find((transliteration) => transliteration === enabledTransliteration);
				});
			},
			getEnabledQuranTextEdition: () => {
				const quranSettings = get().quranSettings;
				const enabledQuranTextEdition = quranSettings().enabledQuranTextEdition;
				const quranTextEditions = quranSettings().quranTextEditions;
				return quranTextEditions?.find((quranTextEdition) => quranTextEdition === enabledQuranTextEdition);
			},
		}),
	),
);
