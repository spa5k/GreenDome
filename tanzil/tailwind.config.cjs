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
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
		],
		rtl: false,
		darkTheme: 'business',
	},
	plugins: [require('daisyui')],
};
// {
// 	default: {
// 		primary: "#FFB703",
// 		"primary-focus": "#e28b00",
// 		secondary: "#006190",
// 		"primary-content": "#023047",
// 		accent: "#8ECAE6",
// 		neutral: "#e7e5e4",
// 		"base-100": "#2A303C",
// 		info: "#219EBC",
// 		success: "#36D399",
// 		warning: "#FB8500",
// 		error: "#F87272",
// 	},
// },

// require("tailwindcss-logical"),
// require('tailwindcss-themer')({
// 	defaultTheme: {
// 		// put the default values of any config you want themed
// 		// just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
// 		extend: {
// 			colors: {
// 				primary: '#023047',
// 				secondary: '#FFB703',
// 				accent: '#FB8500',
// 				info: '#8ECAE6',
// 				neutral: '#219EBC',
// 			},
// 			fontFamily: {
// 				body: ['Readex', ...defaultTheme.fontFamily.sans], // To display translations
// 				heading: ['Rubik', ...defaultTheme.fontFamily.mono], // For headings
// 				display: ['Viga', ...defaultTheme.fontFamily.serif], // For general text like buttons
// 			},
// 		},
// 	},
// 	themes: [
// 		{
// 			name: 'rashidun',
// 			extend: {
// 				colors: {
// 					primary: 'blue',
// 					secondary: '#FCFCFD',
// 					tertiary: '#152C5D',
// 				},
// 			},
// 		},
// 		{
// 			name: 'ayyubid',
// 			extend: {
// 				colors: {
// 					primary: 'blue',
// 				},
// 			},
// 		},
// 		{
// 			name: 'ottoman',
// 			extend: {
// 				colors: {
// 					primary: 'blue',
// 				},
// 			},
// 		},
// 		{
// 			name: 'mughal',
// 			extend: {
// 				colors: {
// 					primary: 'blue',
// 				},
// 			},
// 		},
// 		{
// 			name: 'ummayyad',
// 			extend: {
// 				colors: {
// 					primary: 'blue',
// 				},
// 			},
// 		},
// 	],
// }),
