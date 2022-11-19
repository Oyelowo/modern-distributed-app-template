import { CodegenConfig, generate } from "@graphql-codegen/cli";

const GRAPHQL_GENEATED_CODE_PATH = "./generated/";

export const config: CodegenConfig = {
  schema: "../../rust/graphql-surrealdb/generated/schema.graphql",
  documents: "./operations/*.graphql",
  watch: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  debug: true,
  generates: {
    [GRAPHQL_GENEATED_CODE_PATH]: {
      plugins: [],
      preset: "client",
    },
  },
  hooks: {
    afterAllFileWrite: ["npx ts-node ./scripts/remove_unwanted_files.ts"],
  },
};

generate(config, true);
