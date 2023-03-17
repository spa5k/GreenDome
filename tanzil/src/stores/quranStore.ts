import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type QuranTextFontState = {
	enabledQuranFontEdition: string;
	quranTextFontEditions: string[];
	quranTextEnabled: boolean;
};

type QuranTextFontActions = {
	changeQuranFontEdition: (edition: string) => void;
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
				enabledQuranFontEdition: '',
				quranTextFontEditions: [''],
				quranTextEnabled: Boolean(true),
				changeQuranFontEdition(edition) {
					set(() => ({ enabledQuranFontEdition: edition }));
				},
				toggleQuranTextFont() {
					set(() => ({ quranTextEnabled: !get().quranTextEnabled }));
				},
			}),
			{
				name: 'quranFont',
				getStorage: () => localStorage,
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
	const quranTextEditions = finalEditions.map((edition) => edition.name);

	if (!quranTextEditions.length) {
		return;
	}

	// Delete  ara-quranphoneticst from the editions
	// Deleting it because its transliteration
	const index = quranTextEditions.indexOf('ara-quranphoneticst');
	if (index > -1) {
		quranTextEditions.splice(index, 1);
	}

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
