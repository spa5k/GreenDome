import { SalahCard } from '@/components/Card/card.js';
import { GeoLocationInfo, getLocationInfo } from '@/features/index.js';
import { useQuery } from 'react-query';

export default function RightBar() {
	return (
		<div className='h-full basis-1/4'>
			
			<Salah />
		</div>
	);
}



export  function Salah() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { getLocation, prayerTimes, currentPrayer, latitude, longitude } = useSalahStore();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data } = useQuery<GeoLocationInfo>(
		'quran_text',
		async () => {
			return await getLocationInfo();
		},
		{ cacheTime: 1000000 },
	);

	useEffect(() => {
		getLocation();
	}, []);

	if (latitude  === 1) {
		return (
			<div className='flex flex-col items-center justify-center gap-y-10'>
				<IconEosIconsLoading height={100} width={100} />
			</div>
		);
	}

	return (
		<div className='flex flex-col items-center justify-center '>
			{/* <p>Latitude - {latitude}</p>
			<p>Longitude - {longitude}</p> */}
			<div className='flex flex-wrap items-center '>
				{!prayerTimes && <p>Loading...</p>}
				{prayerTimes
					&& prayerTimes.map((prayer) => {
						const time = new Date(prayer.time);
						return (
						
							<SalahCard
								key={prayer.prayer}
								prayer={prayer.prayer}
								time={time}
							/>
							
						);
					})}
			</div>
			<p className='mt-6 text-lg'>Current Prayer: {currentPrayer}</p>

			{/* {data && (
				<p>
					Current location - {data.city}, {data.principalSubdivision}
				</p>
			)} */}
		</div>
	);
}
