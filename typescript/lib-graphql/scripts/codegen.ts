import { CodegenConfig, generate } from "@graphql-codegen/cli";

const GRAPHQL_GENEATED_CODE_PATH = "./generated/";

export const config: CodegenConfig = {
  schema: "../../rust/graphql-surrealdb/generated/schema.graphql",
  documents: ["../**/!(*.d).{ts,tsx}", `!${GRAPHQL_GENEATED_CODE_PATH}**/*`],
  // documents: ["../**/!(*.d).{ts,tsx}'", `!${GRAPHQL_GENEATED_CODE_PATH}**/*`],
  // documents: ["../**/*.tsx", "../**/*.ts", `!${GRAPHQL_GENEATED_CODE_PATH}**/*`],
  // documents: "./operations/*.graphql",
  watch: true,
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  debug: false,
  generates: {
    [GRAPHQL_GENEATED_CODE_PATH]: {
      plugins: [],
      preset: "client",
    },
  },
  hooks: {
    afterAllFileWrite: ["npx ts-node ./scripts/sanitizeImports.ts"],
  },
};

generate(config, true);
