import HomePage from "../components/HomePage";
import { useSession, useSignOut } from "../hooks/authentication";
import { useGetUserQuery, useGetUsersQuery, useMeQuery } from "@oyelowo/graphql-client";
import { client } from "../config/client";
import { AppContext } from "next/app";
import { Button, useThemeAtom } from "@oyelowo/ui/components";
import { TW, classnames as cx, TBorders } from "@oyelowo/ui/tailwind";
import { OverlayProvider } from "react-aria";
import { Popover } from "@oyelowo/ui/components";

export default function Home() {
  const { signOutCustom } = useSignOut();
  const [theme] = useThemeAtom();
  const data = useSession();
  const { data: { me } = {} } = useMeQuery(client, {}, { staleTime: 600 * 1000 });

  if (data.status === "loading") {
    return (
      <div className="bg-black h-screen text-white">
        <h1>Loading...</h1>
      </div>
    );
  }
  const k: TBorders = "border-sky-500";
  // classnames("rere")
  if (data.status === "success") {
    return (
      <div
        data-theme={theme}
        className={cx(
          TW.borderStyle("required:border-dashed"),
          TW.borderRadius("rounded-3xl")
          // TW.borderColor("re"),
        )}
      >
        ; Signedd in as: Id: {data.data?.session.userId} <br />
        Username: {me?.username} <br />
        Email: {me?.email} <br />
        Post: {me?.postCount} <br />
        <Button onClick={() => signOutCustom()}>Sign out</Button>
        <br />
        <br />
        <Popover>
          <Popover.Trigger>Namee</Popover.Trigger>
          <Popover.Content>Some content</Popover.Content>
        </Popover>
        <br />
        <HomePage />
      </div>
    );
  }

  return null;
}
