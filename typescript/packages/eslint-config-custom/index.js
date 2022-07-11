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
  },
  plugins: ["testing-library", "jest"],
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
