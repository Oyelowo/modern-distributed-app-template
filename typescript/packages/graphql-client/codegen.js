// import { generate } from "@graphql-codegen/cli";
const { generate } = require("@graphql-codegen/cli");

async function doSomething() {
  const generatedFiles = await generate(
    {
      //   schema: "http://127.0.0.1:3000/graphql",
      schema: "../../../rust/graphql-mongo/generated/schema.graphql",
      documents: "./operations/*.graphql",
      generates: {
        // [process.cwd() + "/models/types.d.ts"]: {
        [process.cwd() + "/generated/generated.ts"]: {
          plugins: [
            "typescript",
            "typescript-operations",
            "typescript-react-query",
          ],
        },
      },
      config: {
        fetcher: "graphql-request",
      },
      // customFetch: "graphql-request",
    },
    true
  );
}


doSomething()