module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'jsx-a11y',
		'@typescript-eslint',
		'import',
		'simple-import-sort',
		'react',
	],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:import/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	settings: {
		react: {
			version: '18.2.0',
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: ['packages/*/tsconfig.json', 'tanzil/tsconfig.json'],
			},
		},
	},
};
