/* eslint-disable */
import * as types from './graphql.js';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query session {\n    session {\n      userId\n      expiresAt\n    }\n  }\n": types.SessionDocument,
    "\n  query getUser($UserBy: UserBy!) {\n    getUser(userBy: $UserBy) {\n      id\n      firstName\n      lastName\n      age\n      email\n      socialMedia\n      createdAt\n      posts {\n        posterId\n        title\n        content\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n      firstName\n      lastName\n      email\n      age\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query session {\n    session {\n      userId\n      expiresAt\n    }\n  }\n"): (typeof documents)["\n  query session {\n    session {\n      userId\n      expiresAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUser($UserBy: UserBy!) {\n    getUser(userBy: $UserBy) {\n      id\n      firstName\n      lastName\n      age\n      email\n      socialMedia\n      createdAt\n      posts {\n        posterId\n        title\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUser($UserBy: UserBy!) {\n    getUser(userBy: $UserBy) {\n      id\n      firstName\n      lastName\n      age\n      email\n      socialMedia\n      createdAt\n      posts {\n        posterId\n        title\n        content\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n      firstName\n      lastName\n      email\n      age\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n      firstName\n      lastName\n      email\n      age\n    }\n  }\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;