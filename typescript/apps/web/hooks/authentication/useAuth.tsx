import { SessionQuery, useSessionQuery } from '@oyelowo/graphql-client';
import { UseQueryOptions } from '@tanstack/react-query';
import { client } from '../../config/client';
import { GraphqlErrorResponse, mapToServerData } from './helpers';

export interface UseSessionProps {
  queryConfig?: UseQueryOptions<SessionQuery, unknown, Partial<SessionQuery>>;
}

export function useAuth() {
  const { data, status, isLoading, error } = useSessionQuery<SessionQuery, GraphqlErrorResponse>(
    client,
    undefined,
    {
      staleTime: 0,
    }
  );

  const _mappedData = mapToServerData({
    status,
    data,
    error,
  });

  return { isAuth: !!(!data?.session.userId && error?.response.data), isLoading };
  // return mappedData;
}
