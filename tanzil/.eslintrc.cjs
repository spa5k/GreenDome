/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	root: true,
	extends: ['custom', './.eslintrc-auto-import.json'],
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
	},
};