import { SessionQuery, useSessionQuery } from '@oyelowo/graphql-client';
import { client } from '../../config/client';
import { GraphqlErrorResponse, mapToServerData } from './helpers';

export function useSession() {
  const { data, status, error } = useSessionQuery<SessionQuery, GraphqlErrorResponse>(
    client,
    undefined,
    {
      staleTime: 0,
    }
  );

  const mappedData = mapToServerData({
    status,
    data,
    error,
  });

  return mappedData;
}
