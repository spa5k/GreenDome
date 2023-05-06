import { Icon } from '@iconify/react';
import { Button, Dialog, DialogTrigger } from '@quran/elements';
import { Key } from 'react';
import { calculatePrayerTimes, getCoordinates, sendSalahNotification } from '..';
import { useLocationTrackedStore, useSalahTrackedStore } from '../store';
import { requestPermission } from '../utils/notification';
import { CalculationForm } from './CalculationDialog';
import { SalahCard } from './SalahCard';

getCoordinates();
calculatePrayerTimes();

const handleSendNotificationClick = () => {
	// Dummy data for testing purposes
	const prayerTime = new Date('2023-05-07T05:30:00Z');
	const prayerName = 'fajr';
	const timeDiffInMinutes = 5;
	const now = new Date();
	sendSalahNotification(
		{
			prayer: prayerName,
			time: prayerTime,
		},
		timeDiffInMinutes,
		null,
		now,
	);
};

export const Salah = () => {
	const { latitude } = useLocationTrackedStore();
	const { prayerTimes, currentPrayer, notificationPermission } = useSalahTrackedStore();

	if (latitude === 1) {
		return (
			<div className='flex flex-col items-center justify-center gap-y-10'>
				<Icon icon='line-md:loading-loop' height={100} width={100} />
			</div>
		);
	}

	return (
		<div className='my-6 flex flex-col items-center justify-center'>
			<Dialog
				onOpenChange={calculatePrayerTimes}
			>
				<DialogTrigger asChild>
					<Button className='gap-2'>
						<Icon icon='ic:baseline-settings-suggest' />
						Salah Settings
					</Button>
				</DialogTrigger>

				<CalculationForm />
			</Dialog>

			<div className='my-2'>
				{notificationPermission !== 'granted'
					? (
						<Button onClick={requestPermission}>
							<Icon icon='ic:round-notifications-off' className='mx-2' />
							Enable Notifications
						</Button>
					)
					: (
						<Button
							onClick={handleSendNotificationClick}
						>
							<Icon icon='material-symbols:notifications-active-sharp' className='mx-2' />
							Test Salah notification
						</Button>
					)}
			</div>

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
