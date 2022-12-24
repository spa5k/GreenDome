module.exports = {
	rules: {
		'no-console': 'error',
	},
	parser: '@typescript-eslint/parser',
	plugins: [
		'solid',
		'jsx-a11y',
		'@typescript-eslint',
		'import',
		'simple-import-sort',
	],
	extends: [
		'eslint:recommended',
		'plugin:solid/typescript',
		'plugin:import/recommended',
		'plugin:solid/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	env: {
		es6: true,
		browser: true,
		node: true,
	},
};
