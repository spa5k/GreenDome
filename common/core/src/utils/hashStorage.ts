import { StateStorage } from 'zustand/middleware';

export const hashStorage: StateStorage = {
	getItem: (key): string => {
		const searchParams = new URLSearchParams(location.hash.slice(1));
		const zipsonValue = searchParams.get(key);
		return decodeFromBinary(String(zipsonValue));
	},
	setItem: (key, newValue): void => {
		const searchParams = new URLSearchParams(location.hash.slice(1));
		searchParams.set(key, encodeToBinary(newValue));
		location.hash = searchParams.toString();
	},
	removeItem: (key): void => {
		const searchParams = new URLSearchParams(location.hash.slice(1));
		searchParams.delete(key);
		location.hash = searchParams.toString();
	},
};

export function decodeFromBinary(str: string): string {
	return decodeURIComponent(
		Array.prototype.map
			.call(atob(str), function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);
}

export function encodeToBinary(str: string): string {
	return btoa(
		encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode(parseInt(p1, 16));
		}),
	);
}
