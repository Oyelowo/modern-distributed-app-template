import { AppProps } from "next/app";
import "../styles/globals.css";
import { GlobalStyles } from "twin.macro";
import { Provider } from "jotai";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { SSRProvider } from "@react-aria/ssr";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();
const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Hydrate state={pageProps.dehydratedState}>
        <SSRProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </SSRProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;

/*   Protected route
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true })
  const isUser = session?.user

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

*/
