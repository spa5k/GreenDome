import type { SalahActions, SalahState } from '@/features/index.js';
import { getPrayerTimes } from '@/features/index.js';

import { CalculationParameters } from 'adhan';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useSalahStore = create<SalahState & SalahActions>()(devtools(persist((set, get) => (
	{
		getLocation: () => {
			if (get().latitude !== 1 && get().longitude !== 1) {
				get().getPrayerTimes();
				return;
			}

			const options = {
				enableHighAccuracy: true,
				timeout: 10000,
			};

			const successCallback = (position: GeolocationPosition) => {
				set(() => ({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				}));
				get().getPrayerTimes();
			};

			const errorCallback = (error: GeolocationPositionError) => {
				console.log('Error in position', error);
			};

			navigator.geolocation.getCurrentPosition(
				successCallback,
				errorCallback,
				options,
			);
		},
		getPrayerTimes: () => {
			const { calculationParams, currentPrayer, prayerTimes, sunrise, sunset } = getPrayerTimes(get().latitude, get().longitude);
			set(() => ({
				prayerTimes: prayerTimes,
				sunset: sunset,
				sunrise: sunrise,
				currentPrayer: currentPrayer,
				calculationParams: calculationParams,
			}));
		},
		latitude: 1,
		longitude: 1,
		prayerTimes: [],
		countryName: '',
		locality: '',
		principalSubdivision: '',
		addCoords(latitude, longitude) {
			return set(() => ({ latitude, longitude }));
		},
		calculationParams: {} as CalculationParameters,
		sunshine: new Date(),
		sunset: new Date(),
		currentPrayer: 'fajr',
	}
), {
	name: 'salah',
	getStorage: () => localStorage,
})));

if (process.env.NODE_ENV !== 'production') {
	mountStoreDevtool('salahStore', useSalahStore);
}
