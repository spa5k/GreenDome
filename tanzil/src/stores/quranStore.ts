import { create } from 'zustand';

type QuranTextState = {
	enabledQuranTextEdition: string;
	enabledRecieter: string;
	quranTextEditions: string[];
	quranTextEnabled: boolean;
	recieters?: string[];
	recitationEnabled: boolean;
};

type QuranTextActions = {
	changeQuranTextEdition: (edition: string) => void;
	changeRecieter: (recieter: string) => void;
	toggleQuranText: () => void;
	toggleRecitation: () => void;
};

export const useQuranTextSettingsStore = create<QuranTextState & QuranTextActions>((set, get) => ({
	enabledQuranTextEdition: '',
	enabledRecieter: '',
	quranTextEditions: [''],
	quranTextEnabled: Boolean(true),
	recieters: [''],
	recitationEnabled: Boolean(true),
	changeQuranTextEdition(edition) {
		set(() => ({ enabledQuranTextEdition: edition }));
	},
	changeRecieter(recieter) {
		if (get().enabledRecieter !== recieter) {
			set(() => ({ enabledRecieter: recieter }));
		}
	},
	toggleQuranText() {
		set(() => ({ quranTextEnabled: !get().quranTextEnabled }));
	},
	toggleRecitation() {
		set(() => ({ recitationEnabled: !get().recitationEnabled }));
	},
}));
