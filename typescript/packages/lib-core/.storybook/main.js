const path = require("path");
// const fs = require("fs");

// Storybook still using emotion 10 structure which causes breakage.
// This is a work around in the meantime to allow aliasing to old config paths
// https://github.com/storybookjs/storybook/issues/13145
// https://github.com/storybookjs/storybook/pull/13300

// module.exports = {
//   stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "storybook-dark-mode",
//     {
//       name: "@storybook/addon-postcss",
//       options: {
//         cssLoaderOptions: {
//           // When you have splitted your css over multiple files
//           // and use @import('./other-styles.css')
//           importLoaders: 1,
//         },
//         postcssLoaderOptions: {
//           // When using postCSS 8
//           implementation: require("postcss"),
//         },
//       },
//     },
//   ],
// };

const modulesDir = path.join(__dirname, "../../../node_modules");

const updateEmotionAliases = async config => {
  config.resolve.alias = {
    "@emotion/core": path.join(modulesDir, "@emotion/react"),
    "@emotion/styled": path.join(modulesDir, "@emotion/styled"),
    "@emotion/styled-base": path.join(modulesDir, "@emotion/styled"),
    "emotion-theming": path.join(modulesDir, "@emotion/react"),
  };
  return config;
};

module.exports = {
  // stories: ["../src/components/**/*.stories.mdx", "../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links", "storybook-dark-mode"],
  // babel: async options => {
  //   options.plugins.unshift("babel-plugin-twin");
  //   options.presets.push("@emotion/babel-preset-css-prop");
  //   return options;
  // },
  managerWebpack: updateEmotionAliases,
  webpackFinal: updateEmotionAliases,
  babel: config => {
    const getEntryIndexByName = (type, name) => {
      return config[type].findIndex(entry => {
        const entryName = Array.isArray(entry) ? entry[0] : entry;
        return entryName.includes(name);
      });
    };

    // Replace reference to v10 of the Babel plugin to v11.
    const emotionPluginIndex = getEntryIndexByName("plugins", "babel-plugin-emotion");
    config.plugins[emotionPluginIndex] = require.resolve("@emotion/babel-plugin");

    // Storybook's Babel config is already configured to use the new JSX runtime.
    // We just need to point it to Emotion's version.
    // https://emotion.sh/docs/css-prop#babel-preset
    const presetReactIndex = getEntryIndexByName("presets", "@babel/preset-react");
    config.presets[presetReactIndex][1].importSource = "@emotion/react";

    return config;
  },
  //   webpackFinal: (config) => {

  //   const cwd = process.cwd();
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "@emotion/core": path.join(cwd, "node_modules", "@emotion", "react"),
  //     "@emotion/styled": path.join(cwd, "node_modules", "@emotion", "styled"),
  //     "@emotion/styled-base": path.join(cwd, "node_modules", "@emotion", "styled"),
  //     "emotion-theming": path.join(cwd, "node_modules", "@emotion", "react"),
  //   };
  // },
  // webpackFinal: async config => {
  //   const emotionReactEleven = path.dirname(require.resolve("@emotion/react/package.json"));
  //   const emotionStyledEleven = path.dirname(require.resolve("@emotion/styled/package.json"));
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       alias: {
  //         ...config.resolve.alias,
  //         "@emotion/core": emotionReactEleven,
  //         "@emotion/styled": emotionStyledEleven,
  //         "emotion-theming": emotionReactEleven,
  //       },
  //     },
  //   };
  // },
  // webpackFinal: async config => {
  //   config.resolve.alias = {
  //     "@emotion/core": getPackageDir("@emotion/react"),
  //     "@emotion/styled": getPackageDir("@emotion/styled"),
  //   };
  //   return config;
  // },
  //   webpackFinal: async config => {
  //   config.resolve.alias = {
  //     "@emotion/core": "11.5.0",
  //     "@emotion/styled": "11.3.0",
  //   };
  //   return config;
  // },
};

// // Fix for package resolution
// function getPackageDir(filepath) {
//   let currDir = path.dirname(require.resolve(filepath));
//   while (true) {
//     if (fs.existsSync(path.join(currDir, "package.json"))) {
//       return currDir;
//     }
//     const { dir, root } = path.parse(currDir);
//     if (dir === root) {
//       throw new Error(`Could not find package.json in the parent directories starting from ${filepath}.`);
//     }
//     currDir = dir;
//   }
// }
