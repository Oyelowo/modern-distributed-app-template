import {
  SessionQuery,
  useSessionQuery,
  useSignInMutation,
  useSignOutMutation,
} from "@oyelowo/graphql-client";
import { useRouter } from "next/router";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  UseQueryOptions,
} from "react-query";
import { client } from "../config/client";

export function useSignOut() {
  const router = useRouter();
  const { mutate: signOutMutate, data: signOutData } =
    useSignOutMutation(client);

  const signOutCustom = () => {
    signOutMutate(
      {},
      {
        onSuccess: () => {},
        onSettled: () => {
          const client = new QueryClient();
          const cache = new QueryCache();
          const mutCache = new MutationCache();
          client.invalidateQueries(["session"]);
          client.clear();
          cache.clear();
          mutCache.clear();
          router.push("/auth/signin");
        },
      }
    );
  };

  return { signOutCustom };
}

export function useSignIn() {
  const router = useRouter();
  const { mutate, data } = useSignInMutation(client);
  const { mutate: signOutMutate, data: signOutData } =
    useSignOutMutation(client);

  const signInCustom = ({username, password}: {username: string, password: string}) => {
    mutate(
      {
        signInCredentials: {
          username,
          password,
        },
      },
      {
        onSuccess: () => {
          const client = new QueryClient();
          // the generated useSessionQuery graphql hook uses `session` as the key
          router.push("/");
          client.refetchQueries(["session"]);
        },
      }
    );
  };

  return { signInCustom };
}

interface UseSessionProps {
  required: boolean;
  redirectTo: string;
  queryConfig: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
  // queryConfig: UseQueryOptions;
}

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
    // onSuccess: (data) => {
    //   router.push("/");
    // },
    onSettled(data, error) {
      // if (queryConfig.onSettled) queryConfig.onSettled(data, error);
      // if (data || !required) return;
      // TODO: Log error
      const hasError = (data?.session as any)?.errors as any;
      console.log("DATAERROR", data);
      console.log("ERRORERROR", error);
      if (hasError) {
        router.push("/auth/signin");
      }
      // router.push(redirectTo);
    },
    onError: () => {
      router.push("/auth/signin");
    },
    refetchOnMount: "always",
  });

  console.log("DATAAAAppppppp", data);
  console.log("statuspppppp", status);
  console.log("isloadingppppp", isLoading);
  const hasError = (data?.session as any)?.errors as any;

  return {
    session: (hasError as any) ? null : data?.session,
    status,
    isLoading,
  };
  //   return { session: data as Session, status, isLoading };
  //   return [query.data, query.status === "loading"] as const;
}
