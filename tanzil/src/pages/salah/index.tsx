import { GeoLocationInfo, getLocationInfo } from '@/features/index.js';
import { useQuery } from '@tanstack/react-query';
import { Key } from 'react';
import * as adhan from 'adhan'

const madhabOptions = [  { label: 'Shafi', value: adhan.Madhab.Shafi },  { label: 'Hanafi', value: adhan.Madhab.Hanafi },];

const calculationMethodOptions = [  { label: 'Muslim World League', value: adhan.CalculationMethod.MuslimWorldLeague() },  { label: 'Egyptian', value: adhan.CalculationMethod.Egyptian() },  { label: 'Karachi', value: adhan.CalculationMethod.Karachi() },  { label: 'Umm Al-Qura', value: adhan.CalculationMethod.UmmAlQura() },  { label: 'Dubai', value: adhan.CalculationMethod.Dubai() },  { label: 'Qatar', value: adhan.CalculationMethod.Qatar() },  { label: 'Kuwait', value: adhan.CalculationMethod.Kuwait() },  { label: 'Moonsighting Committee', value: adhan.CalculationMethod.MoonsightingCommittee() },  { label: 'Singapore', value: adhan.CalculationMethod.Singapore() },  { label: 'Turkey', value: adhan.CalculationMethod.Turkey() },  { label: 'Tehran', value: adhan.CalculationMethod.Tehran() },  { label: 'North America', value: adhan.CalculationMethod.NorthAmerica() },  { label: 'Other', value: adhan.CalculationMethod.Other() },];

export default function Salah() {
  const [madhab, setMadhab] = useState(adhan.Madhab.Shafi);
  const [calculationMethod, setCalculationMethod] = useState(adhan.CalculationMethod.MuslimWorldLeague());
  
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
      <div className='flex flex-wrap items-center gap-x-5'>
        {!prayerTimes && <p>Loading...</p>}
        {prayerTimes &&
          prayerTimes.map((prayer: { time: string | number | Date; prayer: Key | null | undefined; }) => {
            const time = new Date(prayer.time);
            return <SalahCard key={prayer.prayer} prayer={prayer.prayer as string} time={time} />;
          })}
      </div>
      <p className='mt-6 text-lg'>Current Prayer: {currentPrayer}</p>
  
      <div className='mt-6'>
        <label htmlFor='madhab-select' className='mr-2'>
          Madhab:
        </label>
        <select
          id='madhab-select'
          value={madhab}
          onChange={(e) => {
            setMadhab(e.target.value as adhan.Madhab);
          }}
        >
          {madhabOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
  
        <label htmlFor='calculation-method-select' className='ml-4 mr-2'>
          Calculation Method:
        </label>
        <select
          id='calculation-method-select'
          value={calculationMethod}
          onChange={(e) => {
            setCalculationMethod(e.target.value as adhan.CalculationMethod);
          }}
        >
          {calculationMethodOptions.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  
}
