module.exports = {
	'extends': 'eslint:all',
	'parserOptions': {
		'ecmaVersion': 9,
		'sourceType': 'module'
	},
	'globals': {
		'document': false,
		'module': false,
		'Handlebars': false,
		'self': false,
		'caches': false
	},
	'env': {
		'browser': true,
		'node': true
	},
	'rules': {
		'quotes': ['error', 'single'],
		'max-len': ['warn', 150],
		'no-magic-numbers': ['error', {
			'ignore': [0,1,-1]
		}],
		'sort-vars': 'off',
		'no-ternary': 'off',
		'no-confusing-arrow': 'off',
		'id-length': 'off',
		'sort-keys': 'off',
		'array-bracket-newline': 'off',
		'multiline-ternary': 'off',
		'quote-props': 'off',
		'max-lines': ['error', 1000],
		'max-statements': ['error', 20],
		'no-extra-parens': ['error', 'all', {
			'nestedBinaryExpressions': false
		}],
		'require-unicode-regexp': 'off'
	}
};
