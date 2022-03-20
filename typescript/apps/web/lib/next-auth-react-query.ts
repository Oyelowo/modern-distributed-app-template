import {
  SessionQuery,
  useSessionQuery,
} from "./../../../packages/graphql-client/generated/generated";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { useQuery, UseQueryOptions, QueryClientConfig } from "react-query";
import { GraphQLClient } from "graphql-request";

export async function fetchSession() {
  const response = await fetch("/api/auth/session");

  const session: Session = await response.json();
  if (Object.keys(session).length > 0) {
    return session;
  }
  return null;
}

interface UseSessionProps {
  required: boolean;
  redirectTo: string;
  queryConfig: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
  // queryConfig: UseQueryOptions;
}

// interface Session {
//   user?: {
//     email: string;
//   };
// }

const client = new GraphQLClient("http://localhost:8080/graphql", {
  headers: {},
});
export function useSessionReactQuery({
  required,
  redirectTo = "/api/auth/signin?error=SessionExpired",
  queryConfig = {},
}: UseSessionProps) {
  const router = useRouter();
  // const k = useGetSession
  // const { data, status, isLoading } = useQuery(["session"], fetchSession, {
  //   ...queryConfig,
  //   onSettled(data, error) {
  //     if (queryConfig.onSettled) queryConfig.onSettled(data, error);
  //     if (data || !required) return;
  //     router.push(redirectTo);
  //   },
  // });

  const { data, status, isLoading } = useSessionQuery(client, undefined, {
    ...queryConfig,
    onSuccess: (data) => {
      router.push("/");
    },
    // onSettled(data, error) {
    //   if (queryConfig.onSettled) queryConfig.onSettled(data, error);
    //   if (data || !required) return;
    //   // TODO: Log error
    //   router.push(redirectTo);
    // },
    onError: () => {
      router.push("custom-signin");
    },
  });

  console.log("DATAAAAppppppp", data);
  console.log("statuspppppp", status);
  console.log("isloadingppppp", isLoading);
const k = (data?.session as any)?.errors as any;
  return {
    session: k as any ? null : data?.session,
    status,
    isLoading,
  };
  //   return { session: data as Session, status, isLoading };
  //   return [query.data, query.status === "loading"] as const;
}
