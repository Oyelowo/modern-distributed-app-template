/* eslint-disable */
import * as types from './graphql.ts';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query session {\n    session {\n      userId\n      expiresAt\n    }\n  }\n": types.SessionDocument,
    "\n  query getUser($UserBy: UserBy!) {\n    getUser(userBy: $UserBy) {\n      id\n      firstName\n      lastName\n      age\n      email\n      socialMedia\n      createdAt\n      posts {\n        posterId\n        title\n        content\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n      firstName\n      lastName\n      email\n      age\n    }\n  }\n": types.CreateUserDocument,
};

export function graphql(source: "\n  query session {\n    session {\n      userId\n      expiresAt\n    }\n  }\n"): (typeof documents)["\n  query session {\n    session {\n      userId\n      expiresAt\n    }\n  }\n"];
export function graphql(source: "\n  query getUser($UserBy: UserBy!) {\n    getUser(userBy: $UserBy) {\n      id\n      firstName\n      lastName\n      age\n      email\n      socialMedia\n      createdAt\n      posts {\n        posterId\n        title\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUser($UserBy: UserBy!) {\n    getUser(userBy: $UserBy) {\n      id\n      firstName\n      lastName\n      age\n      email\n      socialMedia\n      createdAt\n      posts {\n        posterId\n        title\n        content\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n      firstName\n      lastName\n      email\n      age\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n      firstName\n      lastName\n      email\n      age\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;