import { Provider, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
// import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  MantineThemeOverride,
  createEmotionCache,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

const myCache = createEmotionCache({ key: 'oyelowo' });

const overridenTheme: MantineThemeOverride = {
  primaryColor: 'cyan',
};

// If you dont want flickering of white before dark, u can use cookie for color
// scheme. check mantine doc.
// Server side rendering also solves this problem
const colorAtom = atomWithStorage<'dark' | 'light'>('color-scheme', 'dark');
function App({ Component, pageProps }: AppPropsWithLayout & { colorScheme: ColorScheme }) {
  /*
Create a new QueryClient instance inside of your app, and on an instance ref (or in React state).
This ensures that data is not shared between different users and requests, while still only
creating the QueryClient once per component lifecycle.
*/
  const [queryClient] = useState(() => new QueryClient());
  const [colorScheme, setColorScheme] = useAtom(colorAtom);

  const getLayout = Component.getLayout ?? ((page) => page);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  /*
  FIXME: Remove when fixed
  Issue with react not matching what was rendered on the server in react 18
  https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render
  */
  // START
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Oyelowo App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <Provider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Hydrate state={pageProps?.dehydratedState}>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <MantineProvider
                emotionCache={myCache}
                theme={{ colorScheme, ...overridenTheme }}
                withGlobalStyles
                withNormalizeCSS
              >
                <NotificationsProvider position="bottom-right">
                  <ColorSchemeToggle />
                  {getLayout(<Component {...pageProps} />)}
                </NotificationsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default App;
