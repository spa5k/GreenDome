import { SalahCard } from '@/components/Card/card.js';
import { GeoLocationInfo, getLocationInfo } from '@/features/index.js';
import { useQuery } from 'react-query';

export default function PrayerTimesComponent() {
	const { getLocation, prayerTimes, currentPrayer, latitude, longitude } = useSalahStore();
	const { data } = useQuery<GeoLocationInfo>('quran_text', async () => {
		return await getLocationInfo();
	}, { cacheTime: 1000000 });

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<div className='flex flex-col items-center justify-center gap-y-10'>
			<p>
				Latitude - {latitude}
			</p>
			<p>
				Longitude - {longitude}
			</p>
			<div className='flex flex-wrap items-center gap-x-5'>
				{prayerTimes
					? prayerTimes.map((prayer) => {
						const time = new Date(prayer.time);
						return <SalahCard key={prayer.prayer} prayer={prayer.prayer} time={time} />;
					})
					: (
						<div>
							<Button className='mt-4' onClick={() => window.location.assign(window.location.origin)}>
								Refresh
							</Button>
							<p>Loading...</p>
						</div>
					)}
			</div>
			<p className='mt-6 text-lg'>
				Current Prayer: {currentPrayer}
			</p>

			{data && <p>Current location - {data.city}, {data.principalSubdivision}</p>}
		</div>
	);
}
