// import { SessionQuery, useSessionQuery } from "@oyelowo/graphql-client";
import { UseQueryOptions } from "@tanstack/react-query";
import { atom } from "jotai";
import { client } from "../../config/client.ts";
import {
  GraphqlErrorResponse,
  mapReactQueryResultToImpossibleStates,
} from "./helpers.tsx";

export interface UseSessionProps {
  // queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

export function useAuth() {
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
