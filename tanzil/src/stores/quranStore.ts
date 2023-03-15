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

export const useQuranTextFontSettingsStore = create<QuranTextFontState & QuranTextFontActions>()(devtools(persist((set, get) => ({
	enabledQuranFontEdition: '',
	quranTextFontEditions: [''],
	quranTextEnabled: Boolean(true),
	changeQuranFontEdition(edition) {
		set(() => ({ enabledQuranFontEdition: edition }));
	},
	toggleQuranTextFont() {
		set(() => ({ quranTextEnabled: !get().quranTextEnabled }));
	},
}), {
	name: 'quranFont',
	getStorage: () => localStorage,
})));

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('quranFont', useQuranTextFontSettingsStore);
}
