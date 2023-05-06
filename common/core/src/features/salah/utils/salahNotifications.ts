import { salahCalculationStore } from '../store';
import { isPermissionGranted, requestPermission } from './notification';

/*
 * This function will check if the salah time is within 5 minutes and will show a notification
 * if the salah time is within 5 minutes and the notification has not been shown for that salah
 * time today.
 */
export async function checkSalahTimes(): Promise<void> {
	const { setPrayerReminders, prayerReminders, prayerTimes } = salahCalculationStore.getState();
	const now = new Date();
	const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;
	const today = new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);

	if (!isPermissionGranted()) {
		await requestPermission();
	}

	setInterval(() => {
		const now = new Date();
		for (const prayerTime of prayerTimes) {
			const timeDiff = prayerTime.time.getTime() - now.getTime();

			const timeDiffInMinutes = Math.round(timeDiff / 60000);
			if (timeDiffInMinutes >= -1 && timeDiffInMinutes <= 5) {
				const prayerName = prayerTime.prayer.toLowerCase();

				const prayerReminder = prayerReminders[prayerName];

				if (prayerReminder?.reminderSent && prayerReminder?.lastReminderSentTime?.getDate() === now.getDate()) {
					console.log(`Notification already sent for ${prayerName} today`, prayerReminder);
					continue;
				}

				const notification = new Notification('Salah Time', {
					body: `${prayerName} is in ${timeDiffInMinutes} minutes`,
					icon: 'clock.png',
					requireInteraction: false,
					badge: 'islam.png',
					image: 'islam_green.png',
					timestamp: Date.now(),
				});

				setPrayerReminders(prayerName, now);

				notification.onclick = () => {
					window.focus();
					notification.close();
				};
				localStorage.setItem(prayerName, JSON.stringify({ date: today, time: now.getTime() }));
			}
		}
	}, 1000);
}
