import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
	enabledQuranTextEdition: string;
	enabledRecieter: string;
	enabledTranslations: string[];
	enabledTransliterations: string[];
	leftbarEnabled: boolean;
	quranTextEditions: string[];
	quranTextEnabled: boolean;
	recieters?: string[];
	recitationEnabled: boolean;
	rightbarEnabled: boolean;
	translationEnabled: boolean;
	translations?: string[];
	transliterationEnabled: boolean;
	transliterations?: string[];
};

type Actions = {
	changeQuranTextEdition: (edition: string) => void;
	changeRecieter: (recieter: string) => void;
	changeTranslationEditions: (edition: string) => void;
	changeTransliterationEditions: (edition: string) => void;
	toggleCollapsibleLeftbar: () => void;
	toggleCollapsibleRightbar: () => void;
	toggleQuranText: () => void;
	toggleRecitation: () => void;
	toggleTranslation: () => void;
	toggleTransliteration: () => void;
};

export const useSettingsStore = create<State & Actions>()(devtools(persist((set, get) => ({
	enabledQuranTextEdition: '',
	enabledRecieter: '',
	enabledTranslations: [''],
	enabledTransliterations: [''],
	leftbarEnabled: Boolean(true),
	quranTextEditions: [''],
	quranTextEnabled: Boolean(true),
	recieters: [''],
	recitationEnabled: Boolean(true),
	rightbarEnabled: Boolean(true),
	translationEnabled: Boolean(true),
	translations: [''],
	transliterationEnabled: Boolean(true),
	transliterations: [''],
	changeQuranTextEdition(edition) {
		set(() => ({ enabledQuranTextEdition: edition }));
	},
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
	changeTransliterationEditions(edition) {
		const enabledTransliterations = get().enabledTransliterations;
		const index = enabledTransliterations.indexOf(edition);
		if (index === -1) {
			enabledTransliterations.push(edition);
		} else {
			enabledTransliterations.splice(index, 1);
		}
		set(() => ({ enabledTransliterations }));
	},
	toggleQuranText() {
		set(() => ({ quranTextEnabled: !get().quranTextEnabled }));
	},
	changeRecieter(recieter) {
		if (get().enabledRecieter !== recieter) {
			set(() => ({ enabledRecieter: recieter }));
		}
	},
	toggleCollapsibleLeftbar() {
		set(() => ({ leftbarEnabled: !get().leftbarEnabled }));
	},
	toggleCollapsibleRightbar() {
		set(() => ({ rightbarEnabled: !get().rightbarEnabled }));
	},
	toggleRecitation() {
		set(() => ({ recitationEnabled: !get().recitationEnabled }));
	},
	toggleTranslation() {
		set(() => ({ translationEnabled: !get().translationEnabled }));
	},
	toggleTransliteration() {
		set(() => ({ transliterationEnabled: !get().transliterationEnabled }));
	},
}), {
	name: 'settings',
	getStorage: () => localStorage,
})));

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('settingsStore', useSettingsStore);
}

const getQuranTextEditions = async () => {
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions('Quran');
	const quranTextEditions = editions.map((edition) => edition.name);
	const settingsStore = useSettingsStore.getState();
	settingsStore.enabledQuranTextEdition = quranTextEditions[0];
	settingsStore.quranTextEditions = quranTextEditions;
};

const getTranslationEditions = async () => {
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions('Translation');
	const translations = editions.map((edition) => edition.name);
	const settingsStore = useSettingsStore.getState();
	settingsStore.enabledTranslations = [translations[0]];
	settingsStore.translations = translations;
};

const getTransliterationEditions = async () => {
	const editionsApi = new EditionsApi();
	const editions = await editionsApi.getEditions('Transliteration');
	const transliterations = editions.map((edition) => edition.name);
	const settingsStore = useSettingsStore.getState();
	settingsStore.enabledTransliterations = [transliterations[0]];
	settingsStore.transliterations = transliterations;
};
