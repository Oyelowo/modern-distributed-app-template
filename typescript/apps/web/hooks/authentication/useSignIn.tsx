import * as z from 'zod';
import { SignInMutation, useSignInMutation } from '@oyelowo/graphql-client';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { client } from '../../config/client';
import { signInSchema } from '../../components/Authentication/SignInForm';
import { GraphqlIoError, GraphqlErrorResponse } from './helpers';

export function useSignIn({
  onError,
  onSuccess,
}: {
  onError: (e: GraphqlIoError) => void;
  onSuccess: (data: SignInMutation) => void;
}) {
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
          client.refetchQueries(['session']);
          onSuccess(data);
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
