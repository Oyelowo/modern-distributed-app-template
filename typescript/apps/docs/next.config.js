const path = require("path");
const withTM = require("next-transpile-modules")([
  "echarts",
  "zrender",
  "@oyelowo/ui",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
    externalDir: true,
  },
  reactStrictMode: true,
});
