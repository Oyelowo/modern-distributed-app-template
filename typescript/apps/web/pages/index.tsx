import { signIn, signOut } from "next-auth/react";
import HomePage from "../components/HomePage";
import "twin.macro";
import { useRouter } from "next/dist/client/router";
import { useSessionReactQuery, useSignOut } from "../hooks/authentication";
import { DOMAIN_BASE } from "../config/client";

export default function Home() {


 

  return  <HomePage />;
  // return (
  //   <div tw="bg-black h-screen text-white">
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //     {/* <button onClick={() => router.push("/custom-signin")}>Sign in</button> */}
  //   </div>
  // );
}
