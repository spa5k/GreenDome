import { CalculationMethod, CalculationParameters, Madhab, PrayerTimes } from 'adhan';
import { $fetch } from 'ohmyfetch';
import { CalculationMethodEnum, GeoLocationInfo } from '..';

export const getLocationInfo = async () => {
	const data: GeoLocationInfo = await $fetch(
		`https://api.bigdatacloud.net/data/reverse-geocode-client`,
	);
	return data;
};

export const getPrayerTimes = (
	latitude: number,
	longitude: number,
	madhab?: typeof Madhab,
	calculationMethod?: CalculationMethodEnum,
) => {
	let params: CalculationParameters = CalculationMethod.Karachi();
	if (!calculationMethod) {
		params = CalculationMethod.MoonsightingCommittee();
	}
	const date = new Date();
	const times: PrayerTimes = new PrayerTimes({ latitude, longitude }, date, params);

	const prayerTimes = [{ prayer: 'Fajr', time: times.fajr }, { prayer: 'Dhuhr', time: times.dhuhr }, {
		prayer: 'Asr',
		time: times.asr,
	}, {
		prayer: 'Maghrib',
		time: times.maghrib,
	}, { prayer: 'Isha', time: times.isha }];

	return {
		prayerTimes: prayerTimes,
		sunset: times.sunset,
		sunrise: times.sunrise,
		currentPrayer: times.currentPrayer(),
		calculationParams: times.calculationParameters,
	};
};
