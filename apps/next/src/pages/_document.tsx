import { Head, Html, Main, NextScript } from 'next/document';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

export default function Document() {
	useEffect(() => {
		themeChange(false);
	}, []);

	return (
		<Html lang='en'>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
