import { SessionQuery, useSessionQuery } from '@oyelowo/graphql-client';
import { useRouter } from 'next/router';
import { client } from '../../config/client';
import { GraphqlErrorResponse, mapToServerData } from './helpers';
import { UseSessionProps } from './useAuth';

// DOMAIN_BASE

export function useSession(props?: UseSessionProps) {
  // const forceUpdate = useForceUpdate()
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
      // if (hasError) {
      //   router.push('/login/?error=SessionExpired');
      // }
      // forceUpdate();
    },
  });

  let mappedData = mapToServerData({
    status,
    data,
    error,
  });

  return mappedData;
}
