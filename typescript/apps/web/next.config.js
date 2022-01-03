const path = require("path");

const withTM = require("next-transpile-modules")([
  "echarts",
  "zrender",
  "@oyelowo/ui",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL,
  },
  experimental: {
    outputStandalone: true,
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
});
