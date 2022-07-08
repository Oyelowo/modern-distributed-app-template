import { AppProps } from 'next/app';
import { Provider } from 'jotai';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { createElement, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useHotkeys, useLocalStorage, useColorScheme } from '@mantine/hooks';

import { GetServerSidePropsContext } from 'next';
// import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

function App({ Component, pageProps }: AppProps & { colorScheme: ColorScheme }) {
  /* 
Create a new QueryClient instance inside of your app, and on an instance ref (or in React state).
This ensures that data is not shared between different users and requests, while still only
creating the QueryClient once per component lifecycle.
*/
  const [queryClient] = useState(() => new QueryClient());
  // hook will return either 'dark' or 'light' on client
  // and always 'light' during ssr as window.matchMedia is not available
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  /* 
    Saving color scheme in cookie is the easiest way to prevent color scheme mismatch. 
    This strategy can be applied to any framework/library that has server side rendering support. 
    The following example shows how to store color scheme in cookie with Next.js:
     */
  // setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });

  // return (
  // const { Component, pageProps } = props;
  // const [colorScheme, setColorScheme] = useState<ColorScheme>(pageProps.colorScheme);

  // const toggleColorScheme = (value?: ColorScheme) => {
  //   const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
  //   setColorScheme(nextColorScheme);
  //   // setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  // };

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
          {/* <Hydrate state={pageProps.dehydratedState}> */}
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
              <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
                <NotificationsProvider>
                  <Component {...pageProps} />
                </NotificationsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
            <Component {...pageProps} />
          {/* </Hydrate> */}
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: /*  getCookie('mantine-color-scheme', ctx) || */ 'dark',
});

/*  TODO: PROTECTED ROUTES

// pages/admin.jsx
export default function AdminDashboard () {
  const [session] = useSession() 
  // session is always non-null inside this page, all the way down the React tree.
  return "Some super secret dashboard"
}

AdminDashboard.auth = true
//pages/_app.jsx
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth
        ? <Auth><Component {...pageProps} /></Auth>
        : <Component {...pageProps} />
      }
    </SessionProvider>
  )
}

function Auth({ children }) {
  const [session, loading] = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (loading) return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, loading])

  if (isUser) {
    return children
  }
  
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}
It can be easily be extended/modified to support something like an options object. An example:

// pages/admin.jsx
AdminDashboard.auth = {
  role: "admin",
  loading: <AdminLoadingSkeleton/>,
  unauthorized: "/login-with-different-user" // redirect to this url
}
Because of how _app is done, it won't unnecessarily contant the /api/auth/session endpoint for pages that do not require auth.



TYPESCRIPT



export default FooPage;

*/
