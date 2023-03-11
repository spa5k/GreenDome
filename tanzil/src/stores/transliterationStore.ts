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
if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('transliterationStore', useTransliterationSettingsStore);
}
