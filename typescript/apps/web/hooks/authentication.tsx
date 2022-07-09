import * as z from 'zod';
// import { SignInFormSchema } from "../components/SignInForm";
import { useState } from 'react';

import {
  SessionQuery,
  useSessionQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} from '@oyelowo/graphql-client';
import { useRouter } from 'next/router';
import { MutationCache, QueryCache, QueryClient, UseQueryOptions } from 'react-query';
import { client } from '../config/client';
import { useCookie } from 'react-use';
import { signInSchema } from '../components/SignInForm';

export function useSignOut() {
  const router = useRouter();
  const { mutate: signOutMutate, data: signOutData } = useSignOutMutation(client);
  const [value, updateCookie, deleteCookie] = useCookie('oyelowo-session');

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
          router.push('/login');
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

export function useSignIn({ onError }: { onError: (e: GraphqlIoError) => void }) {
  const router = useRouter();

  const { mutate, data, error, status, isLoading } =
    useSignInMutation<GraphqlErrorResponse>(client);

  const signInCustom = ({ username, password }: z.infer<typeof signInSchema>) => {
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

          router.push('/');
        },
        onError: (e) => {
          onError(new GraphqlIoError(e));
        },
      }
    );
  };

  return { signInCustom, data, error: new GraphqlIoError(error), isLoading };
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

export const signUpSchema = z.object({
  username: z.string().min(1, { message: 'Username must be provided' }),
  password: z.string().min(4, { message: 'Invalid password' }),
  passwordConfirm: z.string().min(4, { message: 'Password does not match' }),
  firstName: z.string().min(1, { message: 'firstname must be provided' }),
  lastName: z.string().min(1, { message: 'lastname must be provided' }),
  email: z.string().email({ message: 'Invalid email address' }),
  socialMedia: z.array(z.string({ description: 'socials' }), {}),
  age: z.number().min(18, { message: 'You  must be at least 18 to setup an account' }),
  termsOfService: z.boolean(),
});

export function useSignUp({ onError }: { onError: (e: GraphqlIoError) => void }) {
  const router = useRouter();
  const { mutate, data, error, isLoading } = useSignUpMutation<GraphqlErrorResponse>(client);

  const signUpCustom = (
    user: Omit<z.infer<typeof signUpSchema>, 'passwordConfirm' | 'termsOfService'>
  ) => {
    // const data = signUpSchema.parse(userData);
    // if (user.password !== passwordConfirm) throw new Error('Confirm password has to be the same');
    mutate(
      {
        user,
      },
      {
        onSuccess: () => {
          const client = new QueryClient();
          // the generated useSessionQuery graphql hook uses `session` as the key
          router.push('/');
          // client.refetchQueries(["session"]);
        },
        onError: (e) => {
          onError(new GraphqlIoError(e));
        },
      }
    );
  };

  return { signUpCustom, data, error: new GraphqlIoError(error), isLoading };
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
        router.push('/login/?error=SessionExpired');
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
  status: 'loading' | 'error' | 'success' | 'idle';
  data: TData;
  error: TError;
};

function mapToServerData<TData, TError>({
  status,
  data,
  error,
}: ServerTypeProps<TData, TError>): ServerData<TData, TError> {
  switch (status) {
    case 'loading':
      return {
        status: 'loading',
      };
    case 'error':
      return {
        status: 'error',
        error,
      };
    case 'success':
      return {
        status: 'success',
        data,
      };

    default:
      return {
        status: 'idle',
      };
  }
}

type ServerData<TData, TError> =
  | {
      status: 'error';
      error: TError;
    }
  | {
      status: 'loading';
    }
  | {
      status: 'idle';
    }
  | {
      status: 'success';
      data: TData;
    };
