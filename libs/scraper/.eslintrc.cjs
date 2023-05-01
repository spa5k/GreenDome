/** @type {import('eslint').ESLint.ConfigData} */
// eslint-disable-next-line no-undef
module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			typescript: {
				project: ['tsconfig.json'],
				alwaysTryTypes: true,
			},
		},
	},
	rules: {
		'no-console': 'off',
		'import/no-named-as-default': 'off',
	},
};
