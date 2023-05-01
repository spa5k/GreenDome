import { $fetch } from 'ohmyfetch';
import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { isClient } from '../../../utils/isTauri';

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

export async function getCoordinates(forced = false) {
	if (!isClient) {
		return;
	}
	// check if the locationStore is already set, and not equal to 0
	if (!forced && locationStore.getState().latitude !== 0 && locationStore.getState().longitude !== 0) {
		return;
	}
	try {
		const position = await new Promise<GeolocationPosition>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		locationStore.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
		const data = await calculateLocation(position.coords.latitude, position.coords.longitude);
		locationStore.setState({ location: data, city: data.city, country: data.countryName, locality: data.locality });
	} catch (error) {
		console.error(error);
		throw new Error('Failed to get location');
	}
}

export async function calculateLocation(latitude: number, longitude: number): Promise<LocationData> {
	const url =
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

	try {
		const data: LocationData = await $fetch(url);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to calculate location');
	}
}

export interface LocationData {
	latitude: number;
	longitude: number;
	continent: string;
	lookupSource: string;
	continentCode: string;
	localityLanguageRequested: string;
	city: string;
	countryName: string;
	countryCode: string;
	postcode: string;
	principalSubdivision: string;
	principalSubdivisionCode: string;
	plusCode: string;
	locality: string;
	localityInfo: LocalityInfo;
}

export interface LocalityInfo {
	administrative: Ative[];
	informative: Ative[];
}

export interface Ative {
	name: string;
	description?: string;
	order: number;
	adminLevel?: number;
	isoCode?: string;
	wikidataID?: string;
	geonameID?: number;
}
