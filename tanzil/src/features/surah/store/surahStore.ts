import { Ayah, Edition } from '@/utils/bindings.js';
import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const mushaf = new MushafApi();

type State = {
	quranTextEdition: string;
	translationTextEdition: string;
	transliterationTextEdition: string;
};

type Actions = {
	changeQuranTextEdition: (edition: string) => void;
	fetchQuranText: (number: number) => Promise<{ ayahs: Ayah[]; edition: Edition; }>;
};

export const useSurahStore = create<State & Actions>()(devtools(persist((set, get) => ({
	changeQuranTextEdition: (edition) => set(() => ({ quranTextEdition: edition })),
	quranTextEdition: 'ara-quranuthmanihaf',
	translationTextEdition: 'ara-quranuthmanihaf',
	transliterationTextEdition: 'ara-quranuthmanihaf',
	fetchQuranText: async (number) => {
		const data = await mushaf.ayahsByChapter(number, get().quranTextEdition);
		if (data.err) {
			throw new Error(data.err);
		}
		return data.val;
	},
}), {
	name: 'surah',
	getStorage: () => localStorage,
})));

export const useSurahTrackedStore = createTrackedSelector(
	useSurahStore,
);

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('surahStore', useSurahStore);
}
