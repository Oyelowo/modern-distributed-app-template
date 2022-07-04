import { themes } from "@storybook/theming";


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // layout: "centered",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
  },
  backgrounds: {
    default: "electric-ribbon",
    values: [
      {
        name: "electric-ribbon",
        value: `linear-gradient(180deg, #db00ff, #0047ff)`,
      },
    ],
  },
  // Override the default dark theme
  dark: { ...themes.dark, appBg: "black" },
  // Override the default light theme
  light: { ...themes.normal, appBg: "red" },
};

export const decorators = [(Story) => <Story />];
