import { GeoLocationInfo, getLocationInfo } from '@/features/index.js';
import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';
import * as adhan from 'adhan'

const madhabOptions = [
  { label: 'Shafi', value: adhan.Madhab.Shafi },
  { label: 'Hanafi', value: adhan.Madhab.Hanafi },
];

const calculationMethodOptions = [
  { label: 'Muslim World League', value: adhan.CalculationMethod.MuslimWorldLeague() },
  { label: 'Egyptian', value: adhan.CalculationMethod.Egyptian() },
  { label: 'Karachi', value: adhan.CalculationMethod.Karachi() },
  { label: 'Umm Al-Qura', value: adhan.CalculationMethod.UmmAlQura() },
  { label: 'Dubai', value: adhan.CalculationMethod.Dubai() },
  { label: 'Qatar', value: adhan.CalculationMethod.Qatar() },
  { label: 'Kuwait', value: adhan.CalculationMethod.Kuwait() },
  { label: 'Moonsighting Committee', value: adhan.CalculationMethod.MoonsightingCommittee() },
  { label: 'Singapore', value: adhan.CalculationMethod.Singapore() },
  { label: 'Turkey', value: adhan.CalculationMethod.Turkey() },
  { label: 'Tehran', value: adhan.CalculationMethod.Tehran() },
  { label: 'North America', value: adhan.CalculationMethod.NorthAmerica() },
  { label: 'Other', value: adhan.CalculationMethod.Other() },
];
//add 2 labels for madhab and cacl function using map from the array defined above


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
			{/**/}
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

			{/* {data && (
				<p>
					Current location - {data.city}, {data.principalSubdivision}
				</p>
			)} */}
      {console.log (data,longitude,latitude,calculationMethodOptions, madhabOptions)}
		</div>
	);
}
