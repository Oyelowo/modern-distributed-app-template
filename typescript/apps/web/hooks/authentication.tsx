import * as z from "zod";
import { SignInFormSchema } from "../components/SignInForm";
import { useState } from "react";

import {
  SessionQuery,
  useSessionQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} from "@oyelowo/graphql-client";
import { useRouter } from "next/router";
import { MutationCache, QueryCache, QueryClient, UseQueryOptions } from "react-query";
import { client } from "../config/client";

export function useSignOut() {
  const router = useRouter();
  const { mutate: signOutMutate, data: signOutData } = useSignOutMutation(client);

  const signOutCustom = () => {
    signOutMutate(
      {},
      {
        onSuccess: () => {},
        onSettled: () => {
          const client = new QueryClient();
          const cache = new QueryCache();
          const mutCache = new MutationCache();
          client.refetchQueries(["session"]);
          client.clear();
          cache.clear();
          mutCache.clear();
          router.push("/login");
        },
      }
    );
  };

  return { signOutCustom };
}
export type ErrorGraphql = {
  // {"data":null,"errors":[{"message":"Authentication failed.","locations":[{"line":3,"column":3}],"path":["signIn"]}]}
  response: {
    data: null;
    errors: Array<{
      message: string;
      locations: any;
    }>;
  };
};

export const getGraphqlErrorMessage = (error: ErrorGraphql | null) => {
  return error?.response?.errors?.[0]?.message;
};

export function useSignIn() {
  const router = useRouter();
  const { mutate, data, error } = useSignInMutation<ErrorGraphql>(client);

  const signInCustom = ({ username, password }: z.infer<typeof SignInFormSchema>) => {
    mutate(
      {
        signInCredentials: {
          username,
          password,
        },
      },
      {
        onSuccess: (data) => {
          const client = new QueryClient();

          router.push("/");
        },
      }
    );
  };

  return { signInCustom, data, error };
}

type UserData = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  socialMedia: string;
  age: number;
};

export const SignUpSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(4),
  passwordConfirm: z.string().min(4),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  socialMedia: z.array(z.string(), {}),
  age: z.any(),
});

export function useSignUp() {
  const router = useRouter();
  const { mutate, data } = useSignUpMutation(client);

  const signUpCustom = (user: Omit<z.infer<typeof SignUpSchema>, "passwordConfirm">) => {
    // const user = SignUpSchema.parse(userData);
    mutate(
      {
        user,
      },
      {
        onSuccess: () => {
          const client = new QueryClient();
          // the generated useSessionQuery graphql hook uses `session` as the key
          router.push("/");
          // client.refetchQueries(["session"]);
        },
      }
    );
  };

  return { signUpCustom, data };
}

interface UseSessionProps {
  queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

// DOMAIN_BASE
export function useSession(props?: UseSessionProps) {
  const { queryConfig = { staleTime: 0 } } = props ?? {};

  const router = useRouter();

  const { data, status, isLoading, isIdle, isFetching } = useSessionQuery(client, undefined, {
    ...queryConfig,

    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error);
      if (data?.session?.userId) {
        return;
      }
      router.push("/login/?error=SessionExpired");
    },
  });

  const hasError = (data?.session as any)?.errors as any;

  return {
    session: (hasError as any) ? null : data?.session,
    status,
    isLoading,
    isAuth: !data?.session?.userId,
    isIdle,
    isFetching,
  };
  //   return { session: data as Session, status, isLoading };
  //   return [query.data, query.status === "loading"] as const;
}
