import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
	translation: string;
	enabledTranslations?: string[];
	translationEnabled: boolean;
	transliterationEnabled: boolean;
	leftbarEnabled: boolean;
	rightbarEnabled: boolean;
	recieter: string;
	recitationEnabled: boolean;
};

type Actions = {
	changeTranslationEdition: (edition: string) => void;
	changeRecieter: (recieter: string) => void;
	toggleTranslation: () => void;
	toggleTransliteration: () => void;
	toggleCollapsibleLeftbar: () => void;
	toggleCollapsibleRightbar: () => void;
	toggleRecitation: () => void;
};

export const useSettingsStore = create<State & Actions>()(devtools(persist((set, get) => ({
	recieter: '',
	recitationEnabled: true,
	translation: '',
	translationEnabled: true,
	transliterationEnabled: true,
	leftbarEnabled: true,
	rightbarEnabled: true,
	changeTranslationEdition(edition) {
		if (get().translation !== edition) {
			set(() => ({ translation: edition }));
		}
	},
	changeRecieter(recieter) {
		if (get().recieter !== recieter) {
			set(() => ({ recieter }));
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
		console.log('toggleTranslation', get().translationEnabled);
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
