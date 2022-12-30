import { getSurahList } from '@quran/deen';
import type { Component } from 'solid-js';

const data = await getSurahList();

export const Tanzil: Component = () => {
	return (
		<div>
			<p class='text-4xl text-green-700 text-center py-20'>Bismillah!</p>
		</div>
	);
};
