/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	root: true,
	extends: ['custom', 'plugin:tailwindcss/recommended'],
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
			config: 'tailwind.config.js',
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
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: ['@/features/*/*'],
			},
		],
		'import/no-unresolved': 'off',
		'react/jsx-no-undef': 'off',
		'react/prop-types': 'off',
		'tailwindcss/no-custom-classname': 'off',
	},
};
