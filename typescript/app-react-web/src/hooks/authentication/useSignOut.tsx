// import { useSignOutMutation } from '@oyelowo/graphql-client';
// import { useRouter } from 'next/router';
// import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
// import { client } from '../../config/client';

export function useSignOut() {
  // const router = useRouter();
  // const { mutate: signOutMutate, data: _signOutData } = useSignOutMutation(client);

  const signOutCustom = () => {
    // signOutMutate(
    //   {},
    //   {
    //     onSuccess: () => {
    //       const queryClient = new QueryClient();
    //       const cache = new QueryCache();
    //       const mutCache = new MutationCache();
    //       queryClient.clear();
    //       cache.clear();
    //       mutCache.clear();
    //       router.push('/login');
    //     },
    //     onSettled: () => {},
    //   }
    // );
  };

  return { signOutCustom };
}
