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
  /* 
Create a new QueryClient instance inside of your app, and on an instance ref (or in React state).
This ensures that data is not shared between different users and requests, while still only
creating the QueryClient once per component lifecycle.
*/
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
          <SSRProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </SSRProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

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
