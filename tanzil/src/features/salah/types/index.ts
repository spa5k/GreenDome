import { CalculationParameters } from 'adhan';

export interface GeoLocationInfo {
	latitude: number;
	longitude: number;
	continent: string;
	lookupSource: string;
	continentCode: string;
	localityLanguageRequested: string;
	city: string;
	countryName: string;
	countryCode: string;
	postcode: string;
	principalSubdivision: string;
	principalSubdivisionCode: string;
	plusCode: string;
	locality: string;
	localityInfo: LocalityInfo;
}

export interface LocalityInfo {
	administrative: Ative[];
	informative: Ative[];
}

export interface Ative {
	name: string;
	description?: string;
	order: number;
	adminLevel?: number;
	isoCode?: string;
	wikidataId?: string;
	geonameId?: number;
}

export enum CalculationMethodEnum {
	MuslimWorldLeague,
	Egyptian,
	Karachi,
	UmmAlQura,
	Dubai,
	MoonsightingCommittee,
	NorthAmerica,
	Kuwait,
	Qatar,
	Singapore,
	Tehran,
	Turkey,
	Other,
}

export enum MadhabMethod {
	shafi = 'shafi',
	hanafi = 'hanafi',
}

export type SalahState = {
	latitude: number;
	longitude: number;
	prayerTimes: {
		prayer: string;
		time: Date;
	}[];
	locality: string;
	principalSubdivision: string;
	countryName: string;
	calculationParams: CalculationParameters;
	sunshine: Date;
	sunset: Date;
	currentPrayer: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'none' | 'sunrise';
};

export type SalahActions = {
	getPrayerTimes: () => void;
	addCoords: (latitude: number, longitude: number) => void;
	getLocation: () => void;
};
