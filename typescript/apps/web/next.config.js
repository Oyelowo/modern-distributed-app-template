const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTM = require('next-transpile-modules')([
  'echarts',
  'zrender',
  '@oyelowo/ui',
  '@oyelowo/graphql-client',
]);

// import * as url from 'url';

// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
module.exports = withTM({
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    externalDir: true,
  },
  ...withBundleAnalyzer({
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});
