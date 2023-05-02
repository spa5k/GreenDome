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
	highLatitudeRule?: ValueOf<typeof HighLatitudeRule>;
	polarCircleResolution?: ValueOf<typeof PolarCircleResolution>;
	rounding?: ValueOf<typeof Rounding>;
	shafaq?: ValueOf<typeof Shafaq>;
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
	setHighLatitudeRule: (rule: ValueOf<typeof HighLatitudeRule>) => void;
	setPolarCircleResolution: (resolution: ValueOf<typeof PolarCircleResolution>) => void;
	setRounding: (rounding: ValueOf<typeof Rounding>) => void;
	setShafaq: (shafaq: ValueOf<typeof Shafaq>) => void;
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
