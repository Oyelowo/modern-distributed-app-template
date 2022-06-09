import * as z from "zod";

const EnvironmentVariables = z.object({
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GRAPHQL_MONGO_URL: z.string().min(1), // TODO: Could this be referenced from the kubernetes deployment directly?
});
export const environmentVariables = EnvironmentVariables.parse(process.env);
