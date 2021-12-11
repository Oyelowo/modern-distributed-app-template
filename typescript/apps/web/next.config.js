const withTM = require("next-transpile-modules")([
  "echarts",
  "zrender",
  "@oyelowo/ui",
]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,

});
