import { createTrackedSelector } from 'react-tracked';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Ayah, Edition } from '../../..';
import { AyahResult, EditionWithAyah, MushafApi } from '../../mushaf';

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
		const data: AyahResult = await mushaf.ayahsByChapter(number, get().quranTextEdition);
		if (data.err) {
			throw new Error('Failed to fetch quran text');
		}
		return data.val as EditionWithAyah;
	},
}), {
	name: 'surah',
	storage: createJSONStorage(() => localStorage),
})));

export const useSurahTrackedStore = createTrackedSelector(
	useSurahStore,
);

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('surahStore', useSurahStore);
}
