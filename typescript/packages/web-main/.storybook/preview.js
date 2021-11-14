import { themes } from "@storybook/theming";
import "../styles/globals.css";


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // Override the default dark theme
  dark: { ...themes.dark, appBg: "black" },
  // Override the default light theme
  light: { ...themes.normal, appBg: "red" },
};
