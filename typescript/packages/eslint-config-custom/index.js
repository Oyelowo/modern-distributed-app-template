module.exports = {
  extends: [
    "next",
    "prettier",
    "mantine",
    // "plugin:@next/next/recommended",
    "plugin:jest/recommended",
    "plugin:storybook/recommended",
    // "custom",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "react/react-in-jsx-scope": "off",
    // "no-unused-vars": "off", // or
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
  plugins: ["testing-library", "jest", "unused-imports"],
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
