import { CodegenConfig, generate } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../../rust/graphql-mongo/generated/schema.graphql",
  documents: "./operations/*.graphql",
  generates: {
    ["./src/"]: {
      plugins: [],
      preset: "client",
    },
  },
};

await generate(config, true);
