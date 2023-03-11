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

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('translationsStore', useTranslationSettingsStore);
}
