const path = require("path");

const withTM = require("next-transpile-modules")([
  "echarts",
  "zrender",
  "@oyelowo/ui",
  "@oyelowo/graphql-client",
]);

// import * as z from "zod";

// const EnvironmentVariables = z.object({
//   GITHUB_CLIENT_ID: z.string().nonempty(),
//   GITHUB_CLIENT_SECRET: z.string().nonempty(),
//   GOOGLE_CLIENT_ID: z.string().nonempty(),
//   GOOGLE_CLIENT_SECRET: z.string().nonempty(),
//   GRAPHQL_MONGO_URL: z.string().nonempty(), // TODO: Could this be referenced from the kubernetes deployment directly?
// });
// export const environmentVariables = EnvironmentVariables.parse(process.env);

/** @type {import('next').NextConfig} */
module.exports = withTM({
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
  },
});
