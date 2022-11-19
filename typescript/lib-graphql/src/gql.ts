/* eslint-disable */
import * as types from "./graphql.js";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

const documents = {
  "mutation signIn($signInCredentials: SignInCredentials!) {\n  signIn(signInCredentials: $signInCredentials) {\n    username\n    email\n    age\n  }\n}\n\nmutation signUp($user: UserInput!) {\n  signUp(user: $user) {\n    username\n    email\n    age\n  }\n}\n\nmutation signOut {\n  signOut {\n    userId\n    message\n  }\n}\n\nquery session {\n  session {\n    userId\n    expiresAt\n  }\n}":
    types.SignInDocument,
  "mutation createUser($userInput: UserInput!) {\n  createUser(userInput: $userInput) {\n    id\n    firstName\n    lastName\n    email\n    age\n  }\n}\n\nquery GetUsers {\n  users {\n    id\n    firstName\n    lastName\n    age\n    email\n    socialMedia\n    createdAt\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}\n\nquery getUser($UserBy: UserBy!) {\n  getUser(userBy: $UserBy) {\n    id\n    firstName\n    lastName\n    age\n    email\n    socialMedia\n    createdAt\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}\n\nquery me {\n  me {\n    id\n    username\n    firstName\n    lastName\n    age\n    city\n    roles\n    email\n    socialMedia\n    createdAt\n    postCount\n    accounts {\n      provider\n    }\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}":
    types.CreateUserDocument,
};

export function graphql(
  source:
    "mutation signIn($signInCredentials: SignInCredentials!) {\n  signIn(signInCredentials: $signInCredentials) {\n    username\n    email\n    age\n  }\n}\n\nmutation signUp($user: UserInput!) {\n  signUp(user: $user) {\n    username\n    email\n    age\n  }\n}\n\nmutation signOut {\n  signOut {\n    userId\n    message\n  }\n}\n\nquery session {\n  session {\n    userId\n    expiresAt\n  }\n}",
): (typeof documents)[
  "mutation signIn($signInCredentials: SignInCredentials!) {\n  signIn(signInCredentials: $signInCredentials) {\n    username\n    email\n    age\n  }\n}\n\nmutation signUp($user: UserInput!) {\n  signUp(user: $user) {\n    username\n    email\n    age\n  }\n}\n\nmutation signOut {\n  signOut {\n    userId\n    message\n  }\n}\n\nquery session {\n  session {\n    userId\n    expiresAt\n  }\n}"
];
export function graphql(
  source:
    "mutation createUser($userInput: UserInput!) {\n  createUser(userInput: $userInput) {\n    id\n    firstName\n    lastName\n    email\n    age\n  }\n}\n\nquery GetUsers {\n  users {\n    id\n    firstName\n    lastName\n    age\n    email\n    socialMedia\n    createdAt\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}\n\nquery getUser($UserBy: UserBy!) {\n  getUser(userBy: $UserBy) {\n    id\n    firstName\n    lastName\n    age\n    email\n    socialMedia\n    createdAt\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}\n\nquery me {\n  me {\n    id\n    username\n    firstName\n    lastName\n    age\n    city\n    roles\n    email\n    socialMedia\n    createdAt\n    postCount\n    accounts {\n      provider\n    }\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}",
): (typeof documents)[
  "mutation createUser($userInput: UserInput!) {\n  createUser(userInput: $userInput) {\n    id\n    firstName\n    lastName\n    email\n    age\n  }\n}\n\nquery GetUsers {\n  users {\n    id\n    firstName\n    lastName\n    age\n    email\n    socialMedia\n    createdAt\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}\n\nquery getUser($UserBy: UserBy!) {\n  getUser(userBy: $UserBy) {\n    id\n    firstName\n    lastName\n    age\n    email\n    socialMedia\n    createdAt\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}\n\nquery me {\n  me {\n    id\n    username\n    firstName\n    lastName\n    age\n    city\n    roles\n    email\n    socialMedia\n    createdAt\n    postCount\n    accounts {\n      provider\n    }\n    posts {\n      posterId\n      title\n      content\n    }\n  }\n}"
];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
