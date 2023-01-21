// import { withTailwindTheme } from "./withTailwindTheme.decorator.js";
// export const parameters = {
// 	actions: { argTypesRegex: "^on[A-Z].*" },
// 	controls: {
// 		matchers: {
// 			color: /(background|color)$/i,
// 			date: /Date$/,
// 		},
// 	},
// };

// // export const globalTypes = {
// // 	theme: {
// // 		name: "Theme",
// // 		description: "Global theme for components",
// // 		toolbar: {
// // 			icon: "paintbrush",
// // 			// Array of plain string values or MenuItem shape
// // 			items: [
// // 				{ value: "light", title: "Light", left: "🌞" },
// // 				{ value: "dark", title: "Dark", left: "🌛" },

// // 			],
// // 			// Change title based on selected value
// // 			dynamicTitle: true,
// // 		},
// // 	},
// // };

// export const decorators = [withTailwindTheme];
// import { DEFAULT_THEME } from "./withTailwindTheme.decorator";

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const globalTypes = {
	theme: {
		name: 'Theme',
		description: 'Global theme for components',
		defaultValue: 'light',
		toolbar: {
			icon: 'paintbrush',
			// Array of plain string values or MenuItem shape (see below)
			items: [
				{ value: 'default', title: 'default', left: '🌛' },
				{ value: 'rashidun', title: 'rashidun', left: '🌛' },
				{ value: 'ayyubid', title: 'ayyubid', left: '🌛' },
				{ value: 'ottoman', title: 'ottoman', left: '🌛' },
				{ value: 'mughal', title: 'mughal', left: '🌛' },
				{ value: 'ummayyad', title: 'ummayyad', left: '🌛' },
			],
			// Change title based on selected value
			dynamicTitle: true,
		},
	},
};
