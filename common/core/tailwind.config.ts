import type { Config } from 'tailwindcss';

import coreConfig from '@quran/config';

export default {
	...coreConfig,
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@quran/elements/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@quran/core/**/*.{js,ts,jsx,tsx}',
	],
} satisfies Config;
