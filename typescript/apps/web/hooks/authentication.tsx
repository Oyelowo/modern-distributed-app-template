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
import { useCookie } from "react-use";

export function useSignOut() {
  const router = useRouter();
  const { mutate: signOutMutate, data: signOutData } = useSignOutMutation(client);
  const [value, updateCookie, deleteCookie] = useCookie("oyelowo-session");

  const signOutCustom = () => {
    signOutMutate(
      {},
      {
        onSuccess: () => {
          const client = new QueryClient();
          const cache = new QueryCache();
          const mutCache = new MutationCache();
          // client.refetchQueries(["session"]);
          client.clear();
          cache.clear();
          mutCache.clear();
          deleteCookie();
          router.push("/login");
        },
        onSettled: () => {},
      }
    );
  };

  return { signOutCustom };
}
export type GraphqlErrorResponse = {
  response: {
    data: null;
    errors: Array<{
      message: string;
      locations: Array<{ line: number; column: number }>;
      extenstions: {
        code: number;
        details: string;
      };
    }>;
  };
};

class GraphqlIoError {
  constructor(private errorResponse: GraphqlErrorResponse | null) {
    this.errorResponse = errorResponse;
  }

  getTitle = () => {
    const firstError = this.errorResponse?.response.errors?.[0];
    return firstError?.extenstions?.details ?? firstError?.message;
  };

  getDetails = () => {
    const firstError = this.errorResponse?.response.errors?.[0];
    return firstError?.extenstions?.details ?? firstError?.message;
  };
}

export function useSignIn() {
  const router = useRouter();  

  const { mutate, data, error } = useSignInMutation<GraphqlErrorResponse>(client);

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

  return { signInCustom, data, error: new GraphqlIoError(error) };
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
  const { mutate, data, error } = useSignUpMutation<GraphqlErrorResponse>(client);

  const signUpCustom = (userData: z.infer<typeof SignUpSchema>) => {
    const data = SignUpSchema.parse(userData);
    const { passwordConfirm, ...user } = data;
    if (user.password !== passwordConfirm) throw new Error("Confirm password has to be the same");
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

  return { signUpCustom, data, error: new GraphqlIoError(error) };
}

interface UseSessionProps {
  queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

// DOMAIN_BASE
export function useSession(props?: UseSessionProps) {
  const { queryConfig = { staleTime: 0 } } = props ?? {};

  const router = useRouter();

  const { data, status, isLoading, isIdle, isFetching, error } = useSessionQuery<
    SessionQuery,
    GraphqlErrorResponse
  >(client, undefined, {
    staleTime: 0,
    onSettled(data, error) {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error);
      const hasError = !!error;
      if (hasError) {
        router.push("/login/?error=SessionExpired");
      }
    },
  });

  let mappedData = mapToServerData({
    status,
    data,
    error,
  });

  return mappedData;
}

type ServerTypeProps<TData, TError> = {
  status: "loading" | "error" | "success" | "idle";
  data: TData;
  error: TError;
};

function mapToServerData<TData, TError>({
  status,
  data,
  error,
}: ServerTypeProps<TData, TError>): ServerData<TData, TError> {
  switch (status) {
    case "loading":
      return {
        status: "loading",
      };
    case "error":
      return {
        status: "error",
        error,
      };
    case "success":
      return {
        status: "success",
        data,
      };

    default:
      return {
        status: "idle",
      };
  }
}

type ServerData<TData, TError> =
  | {
      status: "error";
      error: TError;
    }
  | {
      status: "loading";
    }
  | {
      status: "idle";
    }
  | {
      status: "success";
      data: TData;
    };
