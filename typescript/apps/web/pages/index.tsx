import { useSession, signIn, signOut } from "next-auth/react";
import HomePage from "../components/HomePage";
import "twin.macro";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div tw="bg-black h-screen text-white">
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <HomePage />
      </div>
    );
  }
  return (
    <div tw="bg-black h-screen text-white">
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
