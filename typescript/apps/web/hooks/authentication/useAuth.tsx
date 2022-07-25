import { SessionQuery, useSessionQuery } from '@oyelowo/graphql-client';
import { useRouter } from 'next/router';
import { UseQueryOptions } from '@tanstack/react-query';
import { client } from '../../config/client';
import { GraphqlErrorResponse, mapToServerData } from './helpers';

export interface UseSessionProps {
  queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

export function useAuth() {
  // const { queryConfig = { staleTime: 0 } } = props ?? {};
  // const { queryConfig = { staleTime: 0 } } = props ?? {};
  const router = useRouter();

  const { data, status, isLoading, isIdle, isFetching, error } = useSessionQuery<
    SessionQuery,
    GraphqlErrorResponse
  >(client, undefined, {
    staleTime: 0,
    // onSettled(data, error) {
    //   // if (queryConfig.onSettled) queryConfig.onSettled(data, error);
    //   const hasError = !!error;
    //   if (!data?.session.userId && error?.response.data) {
    //     router.push('/login/?error=SessionExpired');
    //   }
    // },
  });

  let mappedData = mapToServerData({
    status,
    data,
    error,
  });

  return { isAuth: !!(!data?.session.userId && error?.response.data), isLoading };
  // return mappedData;
}
