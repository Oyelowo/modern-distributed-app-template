module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["formatjs"],
	rules: {
		"formatjs/no-offset": "error",
		"formatjs/blocklist-elements": [2, ["selectordinal"]],
		"formatjs/enforce-default-message": ["error", "literal"],
		"formatjs/enforce-placeholders": [
			"error",
			{
				ignoreList: ["foo"],
			},
		],
		"formatjs/enforce-plural-rules": [
			2,
			{
				// one: true,
				other: true,
				zero: false,
			},
		],
		semi: ["error", "always"],
	},
};
