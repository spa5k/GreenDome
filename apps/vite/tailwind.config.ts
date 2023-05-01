import type { Config } from 'tailwindcss';

import coreConfig from '@quran/config';

export default {
	...coreConfig,
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@quran/elements/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@quran/core/**/*.{js,ts,jsx,tsx}',
	],
} satisfies Config;
