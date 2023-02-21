/*This code is a React component that displays the daily Islamic prayer times for a user's current location.

The component uses several external packages, including adhan, moment-timezone, react-query, and zustand, to retrieve the prayer times, display the information to the user, and manage state throughout the process.

The component first gets the user's current location coordinates using the usePosition hook from the use-position package. Then, it uses the getPrayerTimes function from the adhan package to calculate the prayer times for the day based on the user's location.

If the user's location and prayer times are successfully retrieved, the component displays the prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha. If the user's current time falls within any of these prayer times, the component displays a notification indicating which prayer is currently active.

The component uses the zustand package to create a state store, which allows it to track and update the prayer times, user's location, and any errors that occur during the process of retrieving this information.

If any errors occur, the component displays an error message to the user and provides a button to try again.
*/

/* eslint-disable @typescript-eslint/no-unused-vars */
import { CalculationMethod, Coordinates, Prayer, PrayerTimes } from 'adhan';
import moment from 'moment-timezone';
import { useQuery } from 'react-query';
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

// create Zustand store
const usePrayerTimesStore = create((set) => ({
	prayerTimes: undefined,
	location: '',
	error: null,
	setPrayerTimes: (newPrayerTimes: PrayerTimes) => set(() => ({ prayerTimes: newPrayerTimes })),
	setLocation: (newLocation: string) => set(() => ({ location: newLocation })),
	setError: (newError: Error) => set(() => ({ error: newError })),
}));

// PrayerTimesComponent
export default function PrayerTimesComponent() {
	const { latitude, longitude, error } = usePosition();
	const { prayerTimes, location, error: zustandError, setPrayerTimes, setLocation, setError } = usePrayerTimesStore();

	useQuery(['prayerTimes', latitude, longitude], () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const newPrayerTimes = getPrayerTimes(latitude!, longitude!);
		setPrayerTimes(newPrayerTimes);
		return newPrayerTimes;
	}, {
		enabled: latitude != null && longitude != null,
		onSuccess: (data: PrayerTimes) => {
			fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
				.then(res => res.json())
				.then(data => {
					setLocation(`${data.locality}, ${data.principalSubdivision}, ${data.countryName} `);
				})
				.catch(err => {
					setError(new Error(err));
				});
		},
		onError: (err) => {
			setError(new Error(err));
		},
	});

	if (error || zustandError) {
		return (
			<div className='flex flex-col items-center'>
				<p className='text-text mb-4'>
					Sorry, an error occurred: {error?.message || zustandError?.message}
				</p>
				<button
					className='bg-secondary text-button hover:bg-tertiary rounded py-2 px-4 font-bold'
					onClick={() => window.location.reload()}
				>
					Try again
				</button>
			</div>
		);
	}

	// prayerCard UI
	function PrayerCard({ prayer, prayerTime, background, text }) {
		return (
			<div className='bg-background flex flex-col items-center justify-center rounded-lg  p-6 shadow-md'>
				<p className='text-text mb-4 text-lg font-bold'>{capitalizeFirstLetter(prayer)}</p>
				<p className='text-text text-center text-3xl font-bold'>{moment(prayerTime).tz(moment.tz.guess()).format('h:mm A')}</p>
			</div>
		);
	}
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-heading mb-4 text-xl font-bold'>Prayer Times in {location}</h1>
			{error
				? (
					<div className='border-border flex flex-col items-center rounded-lg border-2 p-4'>
						<p className='text-text mb-4 '>Sorry, an error occurred: {error.message}</p>
						<button
							className='bg-secondary text-button hover:bg-tertiary rounded py-2 px-4 font-bold'
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
								.filter(prayer =>
									!['date', 'coordinates', 'calculationParameters', 'sunset', 'sunrise']
										.includes(prayer)
								)
								.map((prayer) => {
									return (
										<PrayerCard
											prayer={prayer}
											prayerTime={prayerTimes[prayer]}
											background='background'
											text='text'
											key={prayer}
										/>
									);
								})}
						</div>
						{/* current prayer time but if its sunrise then show dhur */}
						<p className='text-text mt-6 text-lg'>
							Current Prayer: {capitalizeFirstLetter(
								prayerTimes.currentPrayer() === Prayer.Sunrise
									? 'Dhuhr'
									: prayerName(prayerTimes.currentPrayer()),
							)}
						</p>
					</div>
				)
				: <p className='text-text text-lg font-bold'>Getting your location...</p>}
		</div>
	);
}
