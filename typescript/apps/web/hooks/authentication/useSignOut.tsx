import { useSignOutMutation } from '@oyelowo/graphql-client';
import { useRouter } from 'next/router';
import { MutationCache, QueryCache, QueryClient } from 'react-query';
import { client } from '../../config/client';
import { useCookie } from 'react-use';


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
        onSettled: () => { },
      }
    );
  };

  return { signOutCustom };
}
