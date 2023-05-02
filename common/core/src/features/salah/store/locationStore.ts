import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { LocationData } from '..';

interface LocationState {
	latitude: number;
	longitude: number;
	location: LocationData | null;
	error: Error | null;
	city: string;
	country: string;
	locality: string;
}

interface LocationActions {
	getLocation: () => LocationState;
	setLatitude: (latitude: number) => void;
	setLongitude: (longitude: number) => void;
}

export const locationStore = create<
	LocationState & LocationActions
>()(
	devtools(
		persist(
			(set, get) => ({
				latitude: 0,
				longitude: 0,
				location: null,
				error: null,
				city: '',
				country: '',
				locality: '',

				getLocation() {
					const res: LocationState = {
						latitude: get().latitude,
						longitude: get().longitude,
						city: get().city,
						country: get().country,
						locality: get().locality,
						error: null,
						location: get().location,
					};
					return res;
				},
				setLatitude(latitude: number) {
					set({ latitude });
				},
				setLongitude(longitude) {
					set({ longitude });
				},
			}),
			{
				name: 'location',
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);

export const useLocationTrackedStore = createTrackedSelector(
	locationStore,
);
