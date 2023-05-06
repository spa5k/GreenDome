import { CalculationMethod, HighLatitudeRule, Madhab, PolarCircleResolution, Rounding, Shafaq } from 'adhan';
import { ValueOf } from 'adhan/lib/types/TypeUtils';
import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Salahs } from '..';

export type PrayerReminder = {
	lastReminderSentTime?: Date;
	reminderSent: boolean;
};

type CalculationParametersState = {
	azanEnabled: boolean;
	currentPrayer?: 'none' | 'sunrise' | 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
	fajrAngle?: number;
	highLatitudeRule?: ValueOf<typeof HighLatitudeRule> | null;
	ishaAngle?: number;
	ishaInterval?: number;
	madhab?: ValueOf<typeof Madhab>;
	maghribAngle?: number;
	method: keyof typeof CalculationMethod;
	nextPrayer?: 'none' | 'sunrise' | 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
	notificationPermission: NotificationPermission;
	polarCircleResolution?: ValueOf<typeof PolarCircleResolution> | null;
	prayerReminders: Record<'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha', PrayerReminder>;
	prayersNotification: Record<Salahs, boolean>;
	prayerTimes: { prayer: string; time: Date; }[];
	reminderTime: number;
	rounding?: ValueOf<typeof Rounding> | null;
	shafaq?: ValueOf<typeof Shafaq> | null;
	sunrise: Date;
	sunset: Date;
};

type CalculationParametersActions = {
	setAzanEnabled: (value: boolean) => void;
	setFajrAngle: (angle: number) => void;
	setHighLatitudeRule: (rule: ValueOf<typeof HighLatitudeRule> | null) => void;
	setIshaAngle: (angle: number) => void;
	setIshaInterval: (interval: number) => void;
	setMadhab: (madhab: ValueOf<typeof Madhab>) => void;
	setMaghribAngle: (angle: number) => void;
	setMethod: (method: keyof typeof CalculationMethod) => void;
	setNotificationPermission: (value: NotificationPermission) => void;
	setPolarCircleResolution: (resolution: ValueOf<typeof PolarCircleResolution> | null) => void;
	setPrayerReminders: (prayer: Salahs, time: Date) => void;
	setPrayersNotification: (prayer: Salahs, value: boolean) => void;
	setReminderTime: (time: number) => void;
	setRounding: (rounding: ValueOf<typeof Rounding> | null) => void;
	setShafaq: (shafaq: ValueOf<typeof Shafaq> | null) => void;
};

export const salahCalculationStore = create<
	CalculationParametersState & CalculationParametersActions
>()(
	devtools(
		persist(
			(set, get) => ({
				method: 'MuslimWorldLeague',
				madhab: Madhab.Hanafi,
				sunrise: new Date(),
				sunset: new Date(),
				prayerTimes: [],
				reminderTime: 0,
				notificationPermission: 'default',
				prayersNotification: {
					fajr: true,
					dhuhr: true,
					asr: true,
					maghrib: true,
					isha: true,
				},
				prayerReminders: {
					fajr: {
						reminderSent: false,
					},
					dhuhr: {
						reminderSent: false,
					},
					asr: {
						reminderSent: false,
					},
					maghrib: {
						reminderSent: false,
					},
					isha: {
						reminderSent: false,
					},
				},
				azanEnabled: true,
				setAzanEnabled(value) {
					set({ azanEnabled: value });
				},
				setMethod: (method) => set({ method }),
				setFajrAngle: (angle) => set({ fajrAngle: angle }),
				setIshaAngle: (angle) => set({ ishaAngle: angle }),
				setIshaInterval: (interval) => set({ ishaInterval: interval }),
				setMaghribAngle: (angle) => set({ maghribAngle: angle }),
				setMadhab: (madhab) => set({ madhab }),
				setHighLatitudeRule: (rule) => set({ highLatitudeRule: rule }),
				setPolarCircleResolution: (resolution) => set({ polarCircleResolution: resolution }),
				setRounding: (rounding) => set({ rounding }),
				setShafaq: (shafaq) => set({ shafaq }),
				setReminderTime: (time) => set({ reminderTime: time }),
				setNotificationPermission(value) {
					set({ notificationPermission: value });
				},
				setPrayersNotification(prayer, value) {
					const state = get();
					set({
						prayersNotification: {
							...state.prayersNotification,
							[prayer]: value,
						},
					});
				},

				setPrayerReminders(prayer: Salahs, time: Date) {
					const state = get();

					const reminder: PrayerReminder = state?.prayerReminders[prayer];
					if (!reminder) {
						return;
					}

					reminder.lastReminderSentTime = time;
					reminder.reminderSent = true;

					set({
						prayerReminders: {
							...state.prayerReminders,
							[prayer]: reminder,
						},
					});
				},
			}),
			{
				name: 'salah',
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);

export const useSalahTrackedStore = createTrackedSelector(
	salahCalculationStore,
);

export const lastSentReminder = (prayer: Salahs) => {
	const state = salahCalculationStore.getState();

	const reminder: PrayerReminder = state?.prayerReminders[prayer];

	// If there is no reminder, return true to send the first reminder.
	if (!reminder?.lastReminderSentTime) {
		return true;
	}

	const now = new Date();

	// If the last reminder was sent today, return false to not send another.
	if (now.getDate() === reminder.lastReminderSentTime?.getDate()) {
		return false;
	}

	// Otherwise return true.
	return true;
};
