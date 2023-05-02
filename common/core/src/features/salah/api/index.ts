import { CalculationParameters, PrayerTimes } from 'adhan';
import { $fetch } from 'ohmyfetch';
import { isClient } from '../../../utils/isTauri';
import { LocationData } from '..';
import { locationStore, salahCalculationStore } from '../store';

export const calculatePrayerTimes = () => {
	if (!isClient) {
		return;
	}
	const {
		method,
		fajrAngle,
		ishaAngle,
		ishaInterval,
		maghribAngle,
		madhab,
		highLatitudeRule,
		polarCircleResolution,
		rounding,
		shafaq,
	} = salahCalculationStore.getState();

	const date = new Date();

	const { latitude, longitude } = locationStore.getState();
	const params = new CalculationParameters(method, fajrAngle, ishaAngle, ishaInterval, maghribAngle);
	if (madhab) {
		params.madhab = madhab;
	}
	if (highLatitudeRule) {
		params.highLatitudeRule = highLatitudeRule;
	}
	if (polarCircleResolution) {
		params.polarCircleResolution = polarCircleResolution;
	}
	if (rounding) {
		params.rounding = rounding;
	}
	if (shafaq) {
		params.shafaq = shafaq;
	}

	const prayerTimes = new PrayerTimes({ latitude, longitude }, date, params);

	const currentPrayer = prayerTimes.currentPrayer(date);
	const nextPrayer = prayerTimes.nextPrayer(date);

	salahCalculationStore.setState({
		sunrise: prayerTimes.sunrise,
		sunset: prayerTimes.sunset,
		prayerTimes: [
			{ prayer: 'Fajr', time: prayerTimes.fajr },
			{ prayer: 'Sunrise', time: prayerTimes.sunrise },
			{ prayer: 'Dhuhr', time: prayerTimes.dhuhr },
			{ prayer: 'Asr', time: prayerTimes.asr },
			{ prayer: 'Maghrib', time: prayerTimes.maghrib },
			{ prayer: 'Isha', time: prayerTimes.isha },
		],
		currentPrayer,
		nextPrayer,
	});
};

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
