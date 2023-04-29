import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Edition, EditionsEnum } from '../../../utils/dbTypes';
import { EditionsApi } from '..';

type QuranTextFontState = {
	enabledQuranFontEdition: Edition;
	quranTextFontEditions?: Edition[];
	quranTextEnabled: boolean;
};

type QuranTextFontActions = {
	changeQuranFontEdition: (edition: Edition) => void;
	toggleQuranTextFont: () => void;
};

/**
 * @description A store that holds the settings for the Quran text font.
 * @name `useQuranTextFontSettingsStore`
 * @property `enabledQuranFontEdition` The currently enabled Quran text font edition
 * @property `quranTextFontEditions` The available Quran text font editions
 * @property `quranTextEnabled` Whether the Quran text is enabled
 * @property `changeQuranFontEdition` - Changes the enabled Quran text font edition
 * @property `toggleQuranTextFont` - Toggles the Quran text
 * @example
 * ```ts
 * const quranTextFontSettingsStore = useQuranTextFontSettingsStore();
 * const { enabledQuranFontEdition, quranTextFontEditions, quranTextEnabled }= useQuranTextFontSettingsStore();
 * const { changeQuranFontEdition, toggleQuranTextFont } = useQuranTextFontSettingsStore();
 * ```
 */
export const useQuranTextFontSettingsStore = create<
	QuranTextFontState & QuranTextFontActions
>()(
	devtools(
		persist(
			(set, get) => ({
				quranTextEnabled: Boolean(true),
				changeQuranFontEdition(edition) {
					set(() => ({ enabledQuranFontEdition: edition }));
				},
				toggleQuranTextFont() {
					set(() => ({ quranTextEnabled: !get().quranTextEnabled }));
				},
				enabledQuranFontEdition: {
					name: 'ara-quranuthmanihaf1',
					author: 'Quran Uthmani Hafs No Diacritics',
					language: 'Arabic',
					direction: 'rtl',
					source: 'https://qurancomplex.gov.sa/',
					id: 1,
					type: 'quran',
					enabled: 'true',
				},
			}),
			{
				name: 'quranFont',
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('quranFont', useQuranTextFontSettingsStore);
}

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

	if (!finalEditions.length) {
		return;
	}
	const blackListedEditions = [
		'ara-quranphoneticst', // Its a transliteration
	];

	const quranTextEditions = finalEditions.filter((edition) => {
		return !blackListedEditions.includes(edition.name);
	});

	const settingsStore = useQuranTextFontSettingsStore.getState();
	settingsStore.quranTextFontEditions = quranTextEditions;
	// Only update if the enabled quran text edition is not set
	if (!settingsStore.enabledQuranFontEdition) {
		settingsStore.enabledQuranFontEdition = quranTextEditions[0];
	}
};

export const useQuranTrackedStore = createTrackedSelector(
	useQuranTextFontSettingsStore,
);
