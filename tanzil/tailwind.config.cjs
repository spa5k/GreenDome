/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
const { join } = require('path');
const defaultTheme = require('tailwindcss/defaultTheme.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'), 'index.html'],
	darkMode: 'class',
	theme: {},
	plugins: [
		require('tailwindcss-logical'),
		require('tailwindcss-themer')({
			defaultTheme: {
				// put the default values of any config you want themed
				// just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
				extend: {
					colors: {
						primary: '#122140',
						secondary: '#0F1726',
						tertiary: '#003566',
						background: '#8A88BF',
						other: '#4F5E8C',
						body: '#F2F2F2',
					},
					fontFamily: {
						body: ['Readex', ...defaultTheme.fontFamily.sans], // To display translations
						heading: ['Rubik', ...defaultTheme.fontFamily.mono], // For headings
						display: ['Viga', ...defaultTheme.fontFamily.serif], // For general text like buttons
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
