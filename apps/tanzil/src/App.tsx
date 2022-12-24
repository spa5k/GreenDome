import { Mushaf } from '@quran/mushaf';
import { Salah } from '@quran/salah';
import { Tarteel } from '@quran/tarteel';
import type { Component } from 'solid-js';

export const Tanzil: Component = () => {
	return (
		<div>
			<p class='text-4xl text-green-700 text-center py-20'>Bismillah!</p>
			<Salah />
			<Tarteel />
			<Mushaf />
		</div>
	);
};
