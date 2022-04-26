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
        onSuccess: () => { },
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
  // const { mutate: signOutMutate, data: signOutData } =
  //   useSignOutMutation(client);

  const signInCustom = ({
    username,
    password,
  }: z.infer<typeof SignInFormSchema>) => {
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
  username: z.string().nonempty().min(1),
  password: z.string().min(4),
  passwordConfirm: z.string().min(4),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email(),
  socialMedia: z.array(z.string(), {}),
  age: z.number().min(15),
});

export function useSignUp() {
  const router = useRouter();
  const { mutate, data } = useSignUpMutation(client);

  const signUpCustom = (
    user: Omit<z.infer<typeof SignUpSchema>, "passwordConfirm">
  ) => {
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
          client.refetchQueries(["session"]);
        },
      }
    );
  };

  return { signUpCustom, data };
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
  const [isAuth, setIsAuth] = useState(false);
  // const k = useGetSession
  // const { data, status, isLoading } = useQuery(["session"], fetchSession, {
  //   ...queryConfig,
  //   onSettled(data, error) {
  //     if (queryConfig.onSettled) queryConfig.onSettled(data, error);
  //     if (data || !required) return;
  //     router.push(redirectTo);
  //   },
  // });

  const { data, status, isLoading, isIdle, isFetching } = useSessionQuery(
    client,
    undefined,
    {
      ...queryConfig,
      // onSuccess: (data) => {
      //   if (data?.session?.user) {
      //     setIsAuth(true);
      //     router.push("/");
      //   } else {
      //     setIsAuth(false);
      //     router.push("/auth/signin");
      //   }
      // },
      onSettled(data, error) {
        if (queryConfig.onSettled) queryConfig.onSettled(data, error);
        // if (data || !required) return;
        if (data?.session?.user) {
          router.push("/");
          return;
        }
        // router.push("/auth/signin");
        // TODO: Log error
        const hasError = (data?.session as any)?.errors as any;

        if (hasError || error) {
          setIsAuth(false);
          router.push("/auth/signin");
        }
        // router.push(redirectTo);
      },
      // onError: () => {
      //   setIsAuth(false);
      //   router.push("/auth/signin");
      // },
      // refetchOnMount: "always",
    }
  );

  const hasError = (data?.session as any)?.errors as any;

  return {
    session: (hasError as any) ? null : data?.session,
    status,
    isLoading,
    isAuth,
    isIdle,
    isFetching,
  };
  //   return { session: data as Session, status, isLoading };
  //   return [query.data, query.status === "loading"] as const;
}
