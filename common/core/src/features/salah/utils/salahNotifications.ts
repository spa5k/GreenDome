import { salahCalculationStore } from '../store';
import { isPermissionGranted, requestPermission, sendNotification } from './notification';

function schedulePrayerNotifications(prayerTimes: {
	prayer: string;
	time: Date;
}[]) {
	const now = new Date();
	const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
	const today = new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);

	// Schedule notifications for each prayer time
	prayerTimes.forEach(prayerTime => {
		// Convert the prayer time to a Date object
		const prayerTimeInDate = new Date(`${today} ${prayerTime}`);

		// Calculate the time difference between the current time and the prayer time
		const timeDiff = prayerTimeInDate.getTime() - now.getTime();

		// Schedule the notification
		setTimeout(() => {
			const prayerName = getPrayerName(prayerTime);
			const notification = new Notification(`${prayerName} Prayer Time`, {
				body: `It's time for ${prayerName} prayer.`,
				icon: 'path/to/notification-icon.png',
			});
		}, timeDiff);
	});
}

function getPrayerName(prayerTime: { prayer: string; time: Date; }) {
	switch (prayerTime.prayer) {
		case 'Fajr':
			return 'Fajr';
		case 'Dhuhr':
			return 'Dhuhr';
		case 'Asr':
			return 'Asr';
		case 'Maghrib':
			return 'Maghrib';
		case 'Isha':
			return 'Isha';
		default:
			return '';
	}
}

export function checkSalahTimes() {
	const prayerTimes = salahCalculationStore.getState().prayerTimes;
	const now = new Date();
	const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
	const today = new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);

	if (!isPermissionGranted()) {
		requestPermission();
	}

	// just do a dummy notification
	setInterval(() => {
		console.log('Dummy notification');

		const notification = sendNotification('Dummy Notification');
		notification.onshow = () => {
			console.log('Notification shown', notification);
		};
		notification.onclick = () => {
			console.log('Notification clicked', notification);
		};
	}, 10000);

	setInterval(() => {
		prayerTimes.forEach(prayerTime => {
			const prayerTimeInDate = new Date(`${today} ${prayerTime}`);
			console.log('prayerTimeInDate', prayerTimeInDate);
			const timeDiff = prayerTimeInDate.getTime() - now.getTime();

			// Check if the prayer time is within 5 minutes
			if (timeDiff > 0 && timeDiff <= 5 * 60 * 1000) {
				const prayerName = getPrayerName(prayerTime);
				const notification = new Notification(`${prayerName} Prayer Time`, {
					body: `It's time for ${prayerName} prayer.`,
					icon: 'path/to/notification-icon.png',
				});
				notification.onclick = () => {
					console.log('Notification clicked', notification);
				};
			}
		});
	}, 60 * 1000); // Check every minute
}
