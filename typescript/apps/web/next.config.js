const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")([
  "echarts",
  "zrender",
  "@oyelowo/ui",
  "@oyelowo/graphql-client",
]);


/** @type {import('next').NextConfig} */
module.exports = withTM({
  // reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    // API_URL: process.env.API_URL,
    // ...environmentVariables,
  },
  experimental: {
    outputStandalone: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
    externalDir: true,
  },
});

// module.exports = withBundleAnalyzer({
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// });
