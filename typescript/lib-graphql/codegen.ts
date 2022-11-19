import { CodegenConfig, generate } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../../rust/graphql-surrealdb/generated/schema.graphql",
  documents: "./operations/*.graphql",
  watch: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    ["./src/"]: {
      plugins: [],
      preset: "client",
    },
  },
};

generate(config, true).catch((e) => {});
