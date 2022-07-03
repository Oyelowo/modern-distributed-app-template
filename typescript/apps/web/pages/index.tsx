import HomePage from "../components/HomePage";
import { useSession, useSignOut } from "../hooks/authentication";
import { useGetUserQuery, useGetUsersQuery, useMeQuery } from "@oyelowo/graphql-client";
import { client } from "../config/client";
import { AppContext } from "next/app";
import { Button } from "@oyelowo/ui/components/Button";

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
      <div /* tw="bg-black h-screen text-white" */>
        Signedd in as:
        <div>
          Id: {data.data?.session.userId} <br />
          Username: {me?.username} <br />
          Email: {me?.email} <br />
          Post: {me?.postCount} <br />
        </div>
        <Button onClick={() => signOutCustom()}>Sign out</Button>
        <HomePage />
      </div>
    );
  }

  return null;
}
