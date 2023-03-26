import { GeoLocationInfo, getLocationInfo } from '@/features/index.js';
import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';

export default function Salah() {
	const { getLocation, prayerTimes, currentPrayer, latitude, longitude } = useSalahTrackedStore();
	const { data } = useQuery<GeoLocationInfo>(
		['quran_text'],
		async () => {
			return await getLocationInfo();
		},
		{ cacheTime: 1000000 },
	);

	useEffect(() => {
		getLocation();
	}, []);
	if (latitude === 1) {
		return (
			<div className='flex flex-col items-center justify-center gap-y-10'>
				<IconEosIconsLoading height={100} width={100} />
			</div>
		);
	}

	return (
		<div className='flex flex-col items-center justify-center gap-y-10'>
			<p>Latitude - {latitude}</p>
			<p>Longitude - {longitude}</p>
			<div className='flex flex-wrap items-center gap-x-5'>
				{!prayerTimes && <p>Loading...</p>}
				{prayerTimes
					&& prayerTimes.map((prayer: { time: string | number | Date; prayer: Key | null | undefined; }) => {
						const time = new Date(prayer.time);
						return (
							<SalahCard
								key={prayer.prayer}
								prayer={prayer.prayer as string}
								time={time}
							/>
						);
					})}
			</div>
			<p className='mt-6 text-lg'>Current Prayer: {currentPrayer}</p>

			{data && (
				<p>
					Current location - {data.city}, {data.principalSubdivision}
				</p>
			)}
		</div>
	);
}
