// import { SessionQuery, useSessionQuery } from "@oyelowo/graphql-client";
import { client } from "../../config/client.ts";
import {
  GraphqlErrorResponse,
  mapReactQueryResultToImpossibleStates,
} from "./helpers.tsx";

export function useSession() {
  // const { data, status, error } = useSessionQuery<
  //   SessionQuery,
  //   GraphqlErrorResponse
  // >(client, undefined, {
  //   staleTime: 0,
  // });

  // const mappedData = mapReactQueryResultToImpossibleStates({
  //   status,
  //   data,
  //   error,
  // });

  // return mappedData;
  return {};
}
