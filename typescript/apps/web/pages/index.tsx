import HomePage from "../components/HomePage";
import "twin.macro";
import { useSession, useSignOut } from "../hooks/authentication";
import { useGetUserQuery, useGetUsersQuery, useMeQuery } from "@oyelowo/graphql-client";
import { client } from "../config/client";
import { ButtonSexy } from "./login";
import { AppContext } from "next/app";

export default function Home() {
  const { signOutCustom } = useSignOut();
  const data = useSession();
  const { data: { me } = {} } = useMeQuery(client, {}, { staleTime: 600 * 1000 });

  if (data.status === "loading") {
    return (
      <div tw="bg-black h-screen text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (data.status === "success") {
    return (
      <div tw="bg-black h-screen text-white">
        Signed in as:
        <div>
          Id: {data.data?.session.userId} <br />
          Username: {me?.username} <br />
          Email: {me?.email} <br />
          Post: {me?.postCount} <br />
        </div>
        <ButtonSexy onClick={() => signOutCustom()}>Sign out</ButtonSexy>
        <HomePage />
      </div>
    );
  }

  return null;
}
