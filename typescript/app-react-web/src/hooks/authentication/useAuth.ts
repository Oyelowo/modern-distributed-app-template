import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { atom } from "jotai";
import {
  GraphqlErrorResponse,
  mapReactQueryResultToImpossibleStates,
} from "./helpers.js";
import { $, Chain } from "lib-graphql";

const chain = Chain("localhost:8000");
const createUserQuery = chain("mutation")({
  createUser: [
    {
      userInput: {
        username: "",
        password: "",
        socialMedia: [],
      },
    },
    {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      age: true,
      posts: {
        id: true,
        title: true,
        poster: {
          age: true,
          email: true,
          username: true,
          posts: {
            id: true,
          },
        },
      },
    },
  ],
});

export interface UseSessionProps {
  // queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

export function useAuth() {
  const { data, status, error } = useQuery(
    ["auth"],
    async () => await createUserQuery
  );

  const _mappedData = mapReactQueryResultToImpossibleStates({
    status,
    data,
    error,
  });

  if (_mappedData.status === "success") {
    _mappedData.data.createUser.posts[0].poster.posts[1].id;
  }

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

