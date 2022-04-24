import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient("https://oyelowo.dev/graphql", {
  credentials: "include",
  headers: {},
});
