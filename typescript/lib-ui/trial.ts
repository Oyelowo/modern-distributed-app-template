import {
    CreateUserDocument,
    GetUserDocument,
    GetUserQuery,
    GetUserQueryVariables,
} from "../lib-graphql/generated/graphql.ts";

// export * from "./generated/generated.tx";

// import { useFragment } from "./src/gql/fragment-masking.ts";
// import { CreateUserDocument, MeDocument } from "./src/gql.ts";
// import { DocumentNode } from 'graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export interface TypedDocumentNode<Result = {}, Variables = {}> extends DocumentNode { }

import { useQuery } from "@tanstack/react-query";
import { gql, GraphQLClient, request } from "https://esm.sh/graphql-request@5.0.0";
// import { CreateUserDocument, MeDocument } from "./src/graphql.ts";
import fetch from "cross-fetch";
import { createClient } from "@urql/core";
import { buildSchema, execute } from "graphql";

// import { Chain, Selector } from './nama/zeus/index.ts';

// // Create a Chain client instance with the endpoint
// const chain = Chain('https://faker.graphqleditor.com/a-team/olympus/graphql');
// const p = await Selector("User")({
//     age: 3
// })
// const k = await chain('query')({

//     user: [{
//         id: 'e',

//     }]
//     // getUser: [{userBy: {email: "e"}}]
// })
// // k.me.posts[0].poster.posts[0].poster

// useFragment(FilmItemFragmentDoc, ).email
// import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
// import { GetUserDocument } from "./src/gql.ts";

// export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

// const k : DocumentType<typeof MeDocument> = {me: {}}
// namedOperations.Query.getUser
// function useQue() {
//     const { data } = useQuery([""], async () => await rawRequest("url", gql(MeDocument), {}))
//     data

// }

// const k = await execute({
//     document: CreateUserDocument,
//     schema: buildSchema(""),
//     variableValues: {

//     }

// })

const client = createClient({
    url: "",
    fetch
})
client.query(CreateUserDocument, { userInput: { username: "", socialMedia: [] } }).toPromise().then(a => a.data?.createUser.email)
client.mutation(CreateUserDocument, { userInput: { socialMedia: [], username: '' } }).toPromise().then(a => a.data?.createUser.age)

// const kp = <T = any, V = Variables>()

// GraphQLClient("", {})
function koo() {

    type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

    const k: DocumentType<typeof CreateUserDocument> = {

    }
    // const j: DocumentNode<typeof CreateUserDocument> = { }

    const { data } = useQuery(["CreateUserDocument"], async ({ queryKey }) => {
        const k = await request(
            "xc",
            CreateUserDocument,
            // queryKey[1]
            { userInput: { username: "", socialMedia: [] } },
        ).then(d => d);

        return k;
    });

    request({
        url: "",
        document: GetUserDocument,
        variables: {
            UserBy: {
                email: "",
            },
        },
    }).then((a) => a);


    // let k: DocumentNode<GetUserDocument>
    request<GetUserQuery, GetUserQueryVariables>({
        url: "",
        document: GetUserDocument,
        variables: {
            UserBy: {
                email: "",
            },
        },
    }).then((a) => a.getUser.age);

    const { } = useQuery(
        ["films"],
        async () => request("xxex", CreateUserDocument, {}).then((a) => a.ant),
        // await rxx({

        // })
    );
}
