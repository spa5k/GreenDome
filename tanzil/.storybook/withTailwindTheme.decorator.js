import { useEffect } from 'react';

export const DEFAULT_THEME = 'light';

export const withTailwindTheme = (Story, context) => {
	const { theme } = context.globals;

	useEffect(() => {
		const htmlTag = document.documentElement;
		htmlTag.setAttribute('data-mode', theme || DEFAULT_THEME);
		themeChange(false);
	}, [theme]);

	return <Story />;
};
