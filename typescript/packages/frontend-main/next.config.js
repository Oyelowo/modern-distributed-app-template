/** @type {import('next').NextConfig} */
module.exports = {
  // reactStrictMode: true,
  webpack: config => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false, path: false };
    return config;
  },
};
