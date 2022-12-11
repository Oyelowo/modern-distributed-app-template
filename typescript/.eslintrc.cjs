module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["formatjs"],
	rules: {
		"formatjs/no-offset": "error",
		// "formatjs/enforce-description": ["error", "literal"],
		//     "formatjs/blocklist-elements": [2, ["selectordinal"]]
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
		// "formatjs/no-id": ["error"],
		// TODO: Uncomment so that strings are always translated.
		// "formatjs/no-literal-string-in-jsx": [
		//   2,
		//   {
		//     // Include or exclude additional prop checks (merged with the default checks)
		//     props: {
		//       include: [
		//         // picomatch style glob pattern for tag name and prop name.
		//         // check `name` prop of `UI.Button` tag.
		//         ["UI.Button", "name"],
		//         // check `message` of any component.
		//         ["*", "message"],
		//       ],
		//       // Exclude will always override include.
		//       exclude: [
		//         // do not check `message` of the `Foo` tag.
		//         ["Foo", "message"],
		//         // do not check aria-label and aria-description of `Bar` tag.
		//         ["Bar", "aria-{label,description}"],
		//       ],
		//     },
		//   },
		// ],
		// semi: ["error", "always"],
	},
};
