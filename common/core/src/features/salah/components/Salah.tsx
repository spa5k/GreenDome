import { Icon } from '@iconify/react';
import { Button, Dialog, DialogTrigger } from '@quran/elements';
import { Key } from 'react';
import { calculatePrayerTimes, getCoordinates, useLocationTrackedStore, useSalahTrackedStore } from '../store';
import { CalculationForm } from './CalculationDialog';
import { SalahCard } from './SalahCard';

getCoordinates();
calculatePrayerTimes();

export const Salah = () => {
	const { latitude } = useLocationTrackedStore();
	const { prayerTimes, currentPrayer } = useSalahTrackedStore();

	if (latitude === 1) {
		return (
			<div className='flex flex-col items-center justify-center gap-y-10'>
				<Icon icon='line-md:loading-loop' height={100} width={100} />
			</div>
		);
	}

	return (
		<div className='my-6 flex flex-col items-center justify-center'>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='gap-2'>
						<Icon icon='ic:baseline-settings-suggest' />
						Salah Settings
					</Button>
				</DialogTrigger>

				<CalculationForm />
			</Dialog>

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
