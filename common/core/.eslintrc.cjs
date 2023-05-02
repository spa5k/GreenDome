/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:tailwindcss/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': 'warn',
		'no-undef': 'off',
		'tailwindcss/no-custom-classname': 'off',
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				project: ['tsconfig.json'],
				alwaysTryTypes: true,
			},
		},
		tailwindcss: {
			callees: ['classnames', 'clsx', 'ctl'],
			config: 'node_modules/@quran/config/src/tailwind.config.ts',
			cssFiles: [
				'**/*.css',
				'!**/node_modules',
				'!**/.*',
				'!**/dist',
				'!**/build',
			],
			cssFilesRefreshRate: 5_000,
			removeDuplicates: true,
			skipClassAttribute: false,
			whitelist: [],
			tags: [],
			classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
		},
	},
};
