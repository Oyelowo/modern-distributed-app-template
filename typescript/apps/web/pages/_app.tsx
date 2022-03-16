import { AppProps } from "next/app";
import "../styles/globals.css";
import { GlobalStyles } from "twin.macro";
import { Provider } from "jotai";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { SSRProvider } from "@react-aria/ssr";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <SSRProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </SSRProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
