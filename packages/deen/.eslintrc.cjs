/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
	root: true,
	extends: ['custom'],
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
