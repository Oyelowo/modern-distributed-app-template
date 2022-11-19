import sh from "shelljs";
// import { GQL_PATH, INDEX_PATH } from "./codegen.ts";

const GRAPHQL_GENEATED_CODE_PATH = "./generated/";
export const GQL_PATH = `${GRAPHQL_GENEATED_CODE_PATH}gql.ts`;
export const INDEX_PATH = `${GRAPHQL_GENEATED_CODE_PATH}index.ts`;

// This is a temporary hack to remove gql.ts and index.ts files as they are not
// really needed for my deno setup but cause IDE linting error(no-local) because
// they deno does not yet support ".js" file import which standard typescript does.
// In Typescript, a .ts file has to be imported as .js but in deno, it has to be .js
// until the issue is resolved
sh.exec(`rm -rf ${INDEX_PATH}`);
sh.exec(`rm -rf ${GQL_PATH}`);
