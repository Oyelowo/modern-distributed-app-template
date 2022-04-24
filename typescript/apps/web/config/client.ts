import { GraphQLClient } from "graphql-request";

// Get this from infra kubernetes and also dynamically assign it depending on the environment
export const DOMAIN_BASE = "https://oyelowo.dev"

export const client = new GraphQLClient(`${DOMAIN_BASE}/graphql`, {
  credentials: "include",
  headers: {},
});

