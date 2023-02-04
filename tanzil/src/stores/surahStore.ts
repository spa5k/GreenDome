import { Ayah } from '@/utils/bindings.js';
import { parse, stringify } from 'zipson';
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
const mushaf = new MushafApi();

type State = {
	quranTextEdition: string;
	translationTextEdition: string;
	transliterationTextEdition: string;
};

const hashStorage: StateStorage = {
	getItem: (key): string => {
		const searchParams = new URLSearchParams(location.hash.slice(1));
		const zipsonValue = searchParams.get(key);
		return parse(String(zipsonValue));
	},
	setItem: (key, newValue): void => {
		const searchParams = new URLSearchParams(location.hash.slice(1));
		searchParams.set(key, stringify(newValue));
		location.hash = searchParams.toString();
	},
	removeItem: (key): void => {
		const searchParams = new URLSearchParams(location.hash.slice(1));
		searchParams.delete(key);
		location.hash = searchParams.toString();
	},
};

export function decodeFromBinary(str: string): string {
	return decodeURIComponent(
		Array.prototype.map
			.call(atob(str), function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);
}

export function encodeToBinary(str: string): string {
	return btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode(parseInt(p1, 16));
		}),
	);
}

type Actions = {
	changeQuranTextEdition: (edition: string) => void;
	fetchQuranText: (number: number) => Promise<Ayah[]>;
};

export const surahStore = create<State & Actions>()(persist((set, get) => ({
	changeQuranTextEdition: (edition) => set(() => ({ quranTextEdition: edition })),
	quranTextEdition: 'ara-quranuthmanihaf',
	translationTextEdition: 'ara-quranuthmanihaf',
	transliterationTextEdition: 'ara-quranuthmanihaf',
	fetchQuranText: async (number) => {
		return await mushaf.ayahsByChapter(number, get().quranTextEdition);
	},
}), {
	name: 'surah', // unique name'
	getStorage: () => hashStorage,
}));
