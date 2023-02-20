// This is a TypeScript/React component that fetches the user's location and displays their local prayer times.

// The import statements bring in necessary libraries and modules.

// The prayerName function is a helper function that returns the prayer name in string format.

// The capitalizeFirstLetter function is a helper function that capitalizes the first letter of a string.

// The getPrayerTimes function takes in the user's latitude and longitude and returns an object containing the prayer times for the current day using the Adhan library.

// The usePrayerTimesStore function creates a Zustand store that will hold the prayer times.

// The PrayerTimesComponent function is the main React component that renders the UI. It uses the usePosition hook from the use-position library to get the user's current latitude and longitude.

// The useEffect hook is used to fetch the user's location and prayer times using the getPrayerTimes function. The results are stored in the Zustand store and in the location state.

// The component displays a loading message while the location and prayer times are being fetched. If there is an error getting the location, an error message is displayed with a button to try again.

// If the location and prayer times are successfully fetched, the component displays the location and the prayer times for the current day. The prayer times are displayed in a grid, with each prayer time in its own box. The current prayer is displayed at the bottom of the component.

// Overall, this code demonstrates how to use React, Zustand, and the Adhan library to create a dynamic prayer times component that updates based on the user's location.

import { CalculationMethod, Coordinates, Prayer, PrayerTimes } from 'adhan';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { usePosition } from 'use-position';
import { create } from 'zustand';

function prayerName(prayer: Prayer) {
	switch (prayer) {
		case Prayer.Fajr:
			return 'Fajr';
		case Prayer.Dhuhr:
			return 'Dhuhr';
		case Prayer.Asr:
			return 'Asr';
		case Prayer.Maghrib:
			return 'Maghrib';
		case Prayer.Isha:
			return 'Isha';
		case Prayer.None:
			return 'None';
		default:
			return '';
	}
}

// capitalize first letter of prayer name
function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// get prayer times
function getPrayerTimes(latitude: number, longitude: number) {
	const coordinates = new Coordinates(latitude, longitude);
	const params = CalculationMethod.Karachi();
	// params.madhab = adhan.Madhab.Hanafi; didnt work for some reason
	const date = new Date();
	return new PrayerTimes(coordinates, date, params);
}

// zustand store custom hook
const usePrayerTimesStore = create((set) => ({
	prayerTimes: undefined,
	setPrayerTimes: (newPrayerTimes: PrayerTimes) => set(() => ({ prayerTimes: newPrayerTimes })),
}));

// PrayerTimesComponent
export default function PrayerTimesComponent() {
	const { latitude, longitude, error } = usePosition();
	const [location, setLocation] = useState('');
	const { prayerTimes, setPrayerTimes } = usePrayerTimesStore();

	useEffect(() => {
		if (latitude != null && longitude != null) {
			const newPrayerTimes = getPrayerTimes(latitude, longitude);
			setPrayerTimes(newPrayerTimes);
			fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
				.then(res => res.json())
				.then(data => {
					setLocation(`${data.locality}, ${data.principalSubdivision}, ${data.countryName} `);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [latitude, longitude, setPrayerTimes]);

	return (
		<div className='flex flex-col items-center'>
			<h1 className='mb-4 text-xl font-bold'>Prayer Times in {location}</h1>
			{error
				? (
					<div className='flex flex-col items-center'>
						<p className='mb-4 text-red-500'>
							Sorry, an error occurred: {error.message}
						</p>
						<button
							className='rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700'
							onClick={() => window.location.reload()}
						>
							Try again
						</button>
					</div>
				)
				: prayerTimes
				? (
					<div className='flex flex-col items-center'>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
							{Object.keys(prayerTimes)
								.filter((prayer) =>
									prayer !== 'date' && prayer !== 'coordinates' && prayer !== 'calculationParameters' && prayer !== 'sunset' && prayer !== 'sunrise'
								)
								.map((prayer) => {
									return (
										<div className='flex flex-col items-center justify-center rounded-lg bg-white px-4 py-6 shadow-md' key={prayer}>
											<p className='mb-4 text-lg font-bold'>{capitalizeFirstLetter(prayer)}</p>
											<p className='text-center text-3xl font-bold'>{moment(prayerTimes[prayer]).tz(moment.tz.guess()).format('h:mm A')}</p>
										</div>
									);
								})}
						</div>
						{/* current prayer time but if its sunrise then show dhur */}
						<p className='mt-6 text-lg'>
							Current Prayer: {capitalizeFirstLetter(
								prayerTimes.currentPrayer() === Prayer.Sunrise
									? 'Dhuhr'
									: prayerName(prayerTimes.currentPrayer()),
							)}
						</p>
					</div>
				)
				: <p className='text-lg font-bold'>Getting your location...</p>}
		</div>
	);
}
