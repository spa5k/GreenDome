import { GeoLocationInfo, getLocationInfo } from '@/features/index.js';
import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';

export const Salah = () => {
	const { getLocation, prayerTimes, currentPrayer, latitude, longitude } = useSalahStore();

	const { data } = useQuery<GeoLocationInfo>(
		['quran_text'],
		async () => {
			return await getLocationInfo();
		},
		{ cacheTime: 1000000 },
	);

	console.log('latitude:', latitude);
	console.log('longitude:', longitude);
	console.log('data:', data);

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
		<div className='flex flex-col items-center justify-center '>
			{}
			<div className='flex flex-wrap items-center '>
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
			<p className=' text-lg font-semibold'>Current Prayer: {currentPrayer}</p>
		</div>
	);
};
