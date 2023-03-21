/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const { fontFamily } = require('tailwindcss/defaultTheme');
const { createThemes } = require('tw-colors');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class', '[data-mode="dark"]'],
	content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'), 'index.html'],
	theme: {
		extend: {
			colors: {
				chestnut: {
					'50': '#faf9f5',
					'100': '#f6efd7',
					'200': '#ecdbad',
					'300': '#d4b679',
					'400': '#b48d4c',
					'500': '#966d2d',
					'600': '#7b531e',
					'700': '#5e3e19',
					'800': '#412b14',
					'900': '#2a1b0e',
				},
				transparent: 'transparent',
				current: 'currentColor',
				black: colors.black,
				white: colors.white,
				gray: colors.gray,
				emerald: colors.emerald,
				indigo: colors.indigo,
				yellow: colors.yellow,
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},

	plugins: [
		require('tailwindcss-animate'),
		require('@shrutibalasa/tailwind-grid-auto-fit'),
		createThemes({
			light: {
				'primary': '#f6efd7',
				'secondary': '#966d2d',
				'tertiary': '#ecdbad',
				'background': '#faf9f5',
				'border': '#ecdbad',
				'heading': '#412b14',
				'text': '#48321a',
				'text_secondary': '#9a7336',
				'text_button': '#faf9f5',
				'subtle': '#f6efd7',
				'brand': {
					100: '#F2F1EB',
					200: '#E5E3D7',
					300: '#CCC7B1',
					400: '#B3AC8B',
					500: '#9B9166',
					600: '#837742',
					700: '#6C5E1F',
					800: '#53460E',
					900: '#39300A',
					1000: '#201B06',
				},
			},
			dark: {
				'primary': '#000000',
				'secondary': '#d4b679',
				'tertiary': '#7b531e',
				'background': '#2a1b0e',
				'border': '#b48d4c',
				'heading': '#ecdbad',
				'text': '#f6efd7',
				'text_secondary': '#d9c495',
				'text_button': '#493822',
				'subtle': '#412b14',
				'brand': {
					100: '#141103',
					200: '#201B06',
					300: '#39300A',
					400: '#53460E',
					500: '#6C5E1F',
					600: '#837742',
					700: '#9B9166',
					800: '#B3AC8B',
					900: '#CCC7B1',
					1000: '#E5E3D7',
				},
			},
		}),
	],
};
