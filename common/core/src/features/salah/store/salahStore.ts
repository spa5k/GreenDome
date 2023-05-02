import { CalculationMethod, HighLatitudeRule, Madhab, PolarCircleResolution, Rounding, Shafaq } from 'adhan';
import { ValueOf } from 'adhan/lib/types/TypeUtils';
import { createTrackedSelector } from 'react-tracked';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type CalculationParametersState = {
	method: null | keyof typeof CalculationMethod;
	fajrAngle?: number;
	ishaAngle?: number;
	ishaInterval?: number;
	maghribAngle?: number;
	madhab?: ValueOf<typeof Madhab>;
	highLatitudeRule?: ValueOf<typeof HighLatitudeRule> | null;
	polarCircleResolution?: ValueOf<typeof PolarCircleResolution> | null;
	rounding?: ValueOf<typeof Rounding> | null;
	shafaq?: ValueOf<typeof Shafaq> | null;
	sunrise: Date;
	sunset: Date;
	prayerTimes: { prayer: string; time: Date; }[];
	currentPrayer?: 'none' | 'sunrise' | 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
	nextPrayer?: 'none' | 'sunrise' | 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';
};

type CalculationParametersActions = {
	setMethod: (method: null | keyof typeof CalculationMethod) => void;
	setFajrAngle: (angle: number) => void;
	setIshaAngle: (angle: number) => void;
	setIshaInterval: (interval: number) => void;
	setMaghribAngle: (angle: number) => void;
	setMadhab: (madhab: ValueOf<typeof Madhab>) => void;
	setHighLatitudeRule: (rule: ValueOf<typeof HighLatitudeRule> | null) => void;
	setPolarCircleResolution: (resolution: ValueOf<typeof PolarCircleResolution> | null) => void;
	setRounding: (rounding: ValueOf<typeof Rounding> | null) => void;
	setShafaq: (shafaq: ValueOf<typeof Shafaq> | null) => void;
	// calculatePrayerTimes: () => void;
};

export const salahCalculationStore = create<
	CalculationParametersState & CalculationParametersActions
>()(
	devtools(
		persist(
			(set) => ({
				method: null,
				madhab: Madhab.Shafi,
				sunrise: new Date(),
				sunset: new Date(),
				prayerTimes: [],

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
