import { SurahApi } from '@/features/index.js';
import type { Component } from 'solid-js';

const data = new SurahApi();
console.log(await data.getSurahs());
console.log(await data.getSurah(1));

export const Tanzil: Component = () => {
	return (
		<div>
			<p class='text-4xl text-green-700 text-center py-20'>Bismillah!</p>
		</div>
	);
};
