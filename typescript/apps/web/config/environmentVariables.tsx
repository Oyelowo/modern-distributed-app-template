import z from "zod";

const EnvironmentVariables = z.object({
  GITHUB_CLIENT_ID: z.string().nonempty(),
  GITHUB_CLIENT_SECRET: z.string().nonempty(),
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
});
export const environmentVariables = EnvironmentVariables.parse(process.env);
