import sh from "shelljs";
// import { GQL_PATH, INDEX_PATH } from "./codegen.ts";

const GRAPHQL_GENEATED_CODE_PATH = "./generated/";
export const GQL_PATH = `${GRAPHQL_GENEATED_CODE_PATH}gql.ts`;
export const INDEX_PATH = `${GRAPHQL_GENEATED_CODE_PATH}index.ts`;

const dotJsToDotTsImport = `sed -i '' -e "s/\(.*from \)*.js/.ts/g"`
// const dotJsToDotTsImport = `rm -rf`
// sh.exec(`sed -i '' -e "s /\(.* from \) *.js /.ts / g" ./generated/index.ts`);
sh.exec(`${dotJsToDotTsImport} ${INDEX_PATH}`);
sh.exec(`${dotJsToDotTsImport} ${GQL_PATH}`);
// sed -i -e "s/\(.*from\)*..js';/.ts';/g" ./gql.ts