import { signIn, signOut } from "next-auth/react";
import HomePage from "../components/HomePage";
import "twin.macro";
import { useRouter } from "next/dist/client/router";
import { useSessionReactQuery, useSignOut } from "../hooks/authentication";
import { DOMAIN_BASE } from "../config/client";

export default function Home() {
  const { signOutCustom } = useSignOut();
  const { session, isLoading } = useSessionReactQuery({
    required: true,
    redirectTo: DOMAIN_BASE,
    queryConfig: {
      staleTime: 60 * 100 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  });

  if (isLoading) {
    return (
      <div tw="bg-black h-screen text-white">
        <h1>Loading...</h1>;
      </div>
    );
  }

  if (session) {
    return (
      <div tw="bg-black h-screen text-white">
        Signed in as {session.user.email} <br />
        Signed in as {session.user.name} <br />
        Signed in as {session.user.image} <br />
        <button onClick={() => signOutCustom()}>Sign out</button>
        <HomePage />
      </div>
    );
  }
  return null;
  // return (
  //   <div tw="bg-black h-screen text-white">
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //     {/* <button onClick={() => router.push("/custom-signin")}>Sign in</button> */}
  //   </div>
  // );
}
