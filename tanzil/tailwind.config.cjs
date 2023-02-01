/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'), 'index.html'],
	darkMode: ['class', '[data-mode="dark"]'],
	daisyui: {
		themes: [
			'light',
			'dark',
			'emerald',
			'corporate',
			'retro',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'black',
			'dracula',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
		],
		styled: false,
		rtl: false,
		darkTheme: 'business',
		logs: false,
	},
	plugins: [require('daisyui')],
};
