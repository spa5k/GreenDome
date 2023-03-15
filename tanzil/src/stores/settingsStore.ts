import { useQuranTextFontSettingsStore } from '@/stores/quranStore.js';
import { useTranslationSettingsStore } from '@/stores/translationsStore.js';
import { useTransliterationSettingsStore } from '@/stores/transliterationStore.js';

/**
 * @description Retrieves the available editions of the Quran text using the Quranic API, and sets the default edition in the Quran Text Settings Store.
 * @async
 * @function getQuranTextEditions
 * @throws {Error} If there are no Quran text editions found
 */
export const getQuranTextEditions = async () => {
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions(EditionsEnum.Quran);
	if (editions.err) {
		throw editions.err;
	}
	const finalEditions = editions.val;

	if (!finalEditions) {
		throw new Error('No Quran text editions found');
	}
	const quranTextEditions = finalEditions.map((edition) => edition.name);

	if (!quranTextEditions.length) {
		return;
	}

	const settingsStore = useQuranTextFontSettingsStore.getState();
	settingsStore.quranTextFontEditions = quranTextEditions;
	// Only update if the enabled quran text edition is not set
	if (!settingsStore.enabledQuranFontEdition) {
		settingsStore.enabledQuranFontEdition = quranTextEditions[0];
	}
};

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

/**
 * @description Store for all settings.
 * @returns {Object} The settings store.
 * @property {Function} getEnabledTranslations - Returns the enabled translations.
 * @property {Function} getEnabledTransliterations - Returns the enabled transliterations.
 * @property {Function} getEnabledQuranTextEdition - Returns the enabled Quran text edition.
 * @property {Function} translationSettings - Returns the translation settings store.
 * @property {Function} transliterationSettings - Returns the transliteration settings store.
 * @property {Function} quranSettings - Returns the Quran text settings store.
 * @property {Function} sidebarSettings - Returns the sidebar settings store.
 * @property {Function} recitationSettings - Returns the recitation settings store.
 * @example
 * ```ts
 * const settingsStore = useSettingsStore();
 * const enabledTranslations = settingsStore.getEnabledTranslations();
 * const enabledTransliterations = settingsStore.getEnabledTransliterations();
 * const enabledQuranTextEdition = settingsStore.getEnabledQuranTextEdition();
 * const translationSettings = settingsStore.translationSettings();
 * const transliterationSettings = settingsStore.transliterationSettings();
 * const quranSettings = settingsStore.quranSettings();
 * const sidebarSettings = settingsStore.sidebarSettings();
 * const recitationSettings = settingsStore.recitationSettings();
 * ```
 */
// export const useSettingsStore = create(
// 	devtools(persist(
// 		combine(
// 			{
// 				translationSettings: useTranslationSettingsStore,
// 				transliterationSettings: useTransliterationSettingsStore,
// 				quranSettings: useQuranTextFontSettingsStore,
// 				sidebarSettings: useSidebarStore,
// 				recitationSettings: useRecitationStore,
// 			},
// 			(_set, get) => ({
// 				getEnabledTranslations: () => {
// 					const translationSettings = get().translationSettings;
// 					const enabledTranslations = translationSettings().enabledTranslations;
// 					const translations = translationSettings().translations;
// 					return enabledTranslations.map((enabledTranslation) => {
// 						return translations?.find(
// 							(translation) => translation === enabledTranslation,
// 						);
// 					});
// 				},
// 				getEnabledTransliterations: () => {
// 					const transliterationSettings = get().transliterationSettings;
// 					const enabledTransliterations = transliterationSettings().enabledTransliterations;
// 					const transliterations = transliterationSettings().transliterations;
// 					return enabledTransliterations.map((enabledTransliteration) => {
// 						return transliterations?.find(
// 							(transliteration) => transliteration === enabledTransliteration,
// 						);
// 					});
// 				},
// 				getEnabledQuranTextEdition: () => {
// 					const quranSettings = get().quranSettings;
// 					const enabledQuranTextEdition = quranSettings().enabledQuranFontEdition;
// 					const quranTextEditions = quranSettings().quranTextEditions;
// 					return quranTextEditions?.find(
// 						(quranTextEdition) => quranTextEdition === enabledQuranTextEdition,
// 					);
// 				},
// 			}),
// 		),
// 		{
// 			name: 'settings',
// 			getStorage: () => localStorage,
// 		},
// 	)),
// );
