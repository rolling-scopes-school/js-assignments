module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['prettier'],
	ignorePatterns: ['/test', '/extensions'],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],
	},
};
