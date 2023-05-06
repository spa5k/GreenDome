import { PrayerReminder, salahCalculationStore } from '../store';
import { isPermissionGranted, requestPermission } from './notification';

/*
 * This function will check if the salah time is within 5 minutes and will show a notification
 * if the salah time is within 5 minutes and the notification has not been shown for that salah
 * time today.
 */

export async function checkSalahTimes(): Promise<void> {
	const { setPrayerReminders, prayerReminders, prayerTimes } = salahCalculationStore.getState();

	if (!isPermissionGranted()) {
		await requestPermission();
	}

	setInterval(() => {
		const now = new Date();
		for (const prayerTime of prayerTimes) {
			const timeDiff = prayerTime.time.getTime() - now.getTime();

			const timeDiffInMinutes = Math.max(Math.round(timeDiff / 60000));

			if (timeDiffInMinutes > 1 && timeDiffInMinutes <= 5) {
				const prayerName = prayerTime.prayer.toLowerCase() as 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

				const prayerReminder: PrayerReminder = prayerReminders[prayerName];

				const prayerReminderDate = Date.parse(prayerReminder?.lastReminderSentTime?.toString() ?? '');

				if (prayerReminder?.reminderSent && prayerReminderDate === now.getDate()) {
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
				const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
				audio.play();
				// parse prayerName to 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha'
				const prayerNameParsed = prayerName as 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

				setPrayerReminders(prayerNameParsed, now);

				notification.onclick = () => {
					window.focus();
					notification.close();
				};
			}
		}
	}, 60 * 1000);

	setInterval(() => {
		const now = new Date();
		for (const prayerTime of prayerTimes) {
			const timeDiff = prayerTime.time.getTime() - now.getTime();
			const timeDiffInMinutes = Math.abs(Math.round(timeDiff / 60000));
			console.log(timeDiffInMinutes);
			if (timeDiffInMinutes < 1) {
				const prayerName = prayerTime.prayer.toLowerCase();

				const notification = new Notification('Salah Time', {
					body: `${prayerName} is happening!`,
					icon: 'clock.png',
					requireInteraction: false,
					badge: 'islam.png',
					image: 'islam_green.png',
					timestamp: Date.now(),
				});
				const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
				audio.play();

				notification.onclick = () => {
					window.focus();
					notification.close();
				};
			}
		}
	}, 20000);
}
