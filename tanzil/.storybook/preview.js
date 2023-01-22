// import { withTailwindTheme } from "./withTailwindTheme.decorator.js";

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	themes: {
		default: 'default',
		list: [
			{ name: 'default', class: 'default', color: '#00aced' },
			{ name: 'dark', class: 'dark', color: '#3b5998' },
		],
	},
	darkMode: {
		classTarget: 'html',
		stylePreview: true,
	},
};
