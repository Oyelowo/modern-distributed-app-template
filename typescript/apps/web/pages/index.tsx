import HomePage from "../components/HomePage";
import "twin.macro";
import { useRouter } from "next/dist/client/router";
import { useSessionReactQuery, useSignOut } from "../hooks/authentication";
import { DOMAIN_BASE } from "../config/client";
import Link from "next/link";

export default function Home() {
  // const { signOutCustom } = useSignOut();
  // // TODO: Change to useAuth
  // const { session, isLoading, isIdle } = useSessionReactQuery({
  //   required: true,
  //   redirectTo: DOMAIN_BASE,
  //   queryConfig: {
  //     staleTime: 60 * 100 * 60 * 3, // 3 hours
  //     refetchInterval: 60 * 1000 * 5, // 5 minutes
  //   },
  // });

  // if (isLoading) {
  //   return (
  //     <div tw="bg-black h-screen text-white">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }

  // if (session?.user) {
  //   return (
  //     <div tw="bg-black h-screen text-white">
  //       Signed in as:
  //       <div>
  //         Email: {session.user.email} <br />
  //         Username: {session.user.name} <br />
  //       </div>
  //       <button onClick={() => signOutCustom()}>Sign out</button>
  //       <HomePage />
  //     </div>
  //   );
  // }

  return (
    <div>
      <div>
        Sign in
        {/* <button
          onClick={() => {
            fetch(`${DOMAIN_BASE}/api/oauth/signin/google`, {
              method: "POST",
              mode: "no-cors",
              redirect: "follow",
            })
              .then((response) => {
                // HTTP 301 response
                // HOW CAN I FOLLOW THE HTTP REDIRECT RESPONSE?
                // if (response.redirected) {
                  console.log("erthg",response)
                  // window.location.href = response.url;
                // }
              })
              .catch(function (err) {
                console.info(err + " url: " + "url");
              });
          }}
          tw="bg-red-600 text-blue-500"
        >
          <a>Sigin in to Github</a>
        </button> */}
        <a href="http://localhost:8000/api/oauth/signin/google">Kuro</a>
      </div>
      <HomePage />
    </div>
  );
  // return (
  //   <div tw="bg-black h-screen text-white">
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //     {/* <button onClick={() => router.push("/custom-signin")}>Sign in</button> */}
  //   </div>
  // );
}
