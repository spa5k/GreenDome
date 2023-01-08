/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const { join } = require('path');

module.exports = {
	content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'), 'index.html'],
	darkMode: 'class',
	plugins: [
		require('tailwindcss-logical'),
		require('tailwindcss-themer')({
			defaultTheme: {
				// put the default values of any config you want themed
				// just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
				extend: {
					colors: {
						primary: '#152C5D',
						secondary: '#1A2744',
						text: '#FCFCFD',
						background: '#090B13',
						other: '#121B31',
						...colors,
					},
				},
			},
			themes: [
				{
					name: 'rashidun',
					extend: {
						colors: {
							primary: 'blue',
							secondary: '#FCFCFD',
							tertiary: '#152C5D',
						},
					},
				},
				{
					name: 'ayyubid',
					extend: {
						colors: {
							primary: 'blue',
						},
					},
				},
				{
					name: 'ottoman',
					extend: {
						colors: {
							primary: 'blue',
						},
					},
				},
				{
					name: 'mughal',
					extend: {
						colors: {
							primary: 'blue',
						},
					},
				},
				{
					name: 'ummayyad',
					extend: {
						colors: {
							primary: 'blue',
						},
					},
				},
			],
		}),
	],
};
