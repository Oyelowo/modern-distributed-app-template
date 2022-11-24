import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { atom } from "jotai";
// import { client } from "../../config/client.js";
import {
  GraphqlErrorResponse,
  mapReactQueryResultToImpossibleStates,
} from "./helpers.js";
import { GraphQLClient } from "graphql-request";
import fetch from "cross-fetch";
import { createClient } from "@urql/core";
import { graphql } from "lib-graphql";

const sessionWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query session {
    session {
      userId
      expiresAt
    }
  }
`);

const getUserWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query getUser($UserBy: UserBy!) {
    getUser(userBy: $UserBy) {
      id
      firstName
      lastName
      age
      email
      socialMedia
      createdAt
      posts {
        posterId
        title
        content
      }
    }
  }
`);

const createUserWithVariablesQueryDocument = graphql(/* GraphQL */ `
  mutation createUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      id
      firstName
      lastName
      email
      age
    }
  }
`);

export interface UseSessionProps {
  // queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

// const query: TypedDocumentNode<{ greetings: string }, never | Record<any, never>> = parse(/* GraphQL */ `
//   query greetings {
//     greetings
//   }
// `)

// const myFetcher = <D, V>(document: TypedDocumentNode<D, V>): D => {
//   // ... parses the document and fetches the data ...
// }

const client = createClient({
  url: "localhost:8000",
  fetch,
});
const clientHttp = new GraphQLClient("", {
  fetch: ""
})

export function useAuth() {
  const { data } = useQuery(
    ["auth"],
    async () =>
      await clientHttp.request(createUserWithVariablesQueryDocument, {
        userInput: {
          username: "", socialMedia: []
        }
      })

    // await client
    //   .query(createUserWithVariablesQueryDocument, {
    //     userInput: { username: "", socialMedia: [] },
    //   })
    //   .toPromise()
  );
  data?.createUser.lastName;
  // const { data } = useQuery(
  //   ["auth"],
  //   async () => await clientHttp.request(CreateUserDocument, {})
  // );
  // data.
  // k.data.
  // const { data, status, isLoading, error } = useSessionQuery<
  //   SessionQuery,
  //   GraphqlErrorResponse
  // >(
  //   client,
  //   undefined,
  //   {
  //     staleTime: 0,
  //   },
  // );

  // const _mappedData = mapReactQueryResultToImpossibleStates({
  //   status,
  //   data,
  //   error,
  // });

  return {
    // isAuth: !!(!data?.session.userId && error?.response.data),
    isAuth: true,
    isLoading: false,
  };
  // return mappedData;
}

type Auth =
  | {
    status: "loggedIn";
    username: string;
  }
  | {
    status: "loggedOut";
  };

const textAtom = atom<Auth>({ status: "loggedOut" });

// const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

export function useAuth2(): Auth {
  return {
    status: "loggedIn",
    username: "lowo",
  };
}
