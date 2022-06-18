import HomePage from "../components/HomePage";
import "twin.macro";
import { useRouter } from "next/dist/client/router";
import { useSession, useSignOut } from "../hooks/authentication";
import { DOMAIN_BASE } from "../config/client";
import Link from "next/link";

export default function Home() {
  const { signOutCustom } = useSignOut();
  // // TODO: Change to useAuth
  const { session, isLoading, isAuth, isIdle } = useSession({
    required: true,
    redirectTo: `${DOMAIN_BASE}`,
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  });

  console.log("SESSSION", session)

  if (isLoading) {
    return (
      <div tw="bg-black h-screen text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isAuth && session) {
    return (
      <div tw="bg-black h-screen text-white">
        Signed in as:
        <div>
          Email: {session.userId} <br />
          {/* Username: {session.user.name} <br /> */}
        </div>
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
