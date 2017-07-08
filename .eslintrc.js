module.exports = exports = {
	"root": true,
	"env": {
		"es6": true,
		"browser": true,
		"node": true,
		"mocha": true
	},
	"parserOptions": {
		"ecmaVersion": 6,
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true
		}
	},
	"plugins": [
		"react"
	],
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"rules": {
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"],
	}
};