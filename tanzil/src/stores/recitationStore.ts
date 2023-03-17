import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';

type Recitation = {
	id: number;
	name: string;
	audioUrl: string;
};

type RecitationState = {
	recitations: Recitation[];
	selectedRecitation: Recitation | null;
	recitationEnabled: boolean;
};

type RecitationActions = {
	selectRecitation: (recitation: Recitation) => void;
	toggleRecitation: () => void;
};

export const useRecitationStore = create<RecitationState & RecitationActions>((set, get) => ({
	recitations: [],
	selectedRecitation: null,
	selectRecitation: (recitation) => {
		set({ selectedRecitation: recitation });
	},
	recitationEnabled: false,
	toggleRecitation() {
		set((state) => ({ recitationEnabled: !state.recitationEnabled }));
	},
}));

export const useRecitationTrackedStore = createTrackedSelector(
	useRecitationStore,
);
