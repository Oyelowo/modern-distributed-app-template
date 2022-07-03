import { useGetUsersQuery, useCreateUserMutation } from "@oyelowo/graphql-client";
import { getLowo } from "@oyelowo/ui";
import Link from "next/link";
import { useQueryClient } from "react-query";
import { client } from "../config/client";

export default function RandomUsers() {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useGetUsersQuery(client);
  const { mutate } = useCreateUserMutation(client, {
    onMutate: () => {
      // queryClient.invalidateQueries(["GetUsers"]);
      queryClient.refetchQueries(["GetUsers"]);
    },
  });
  return (
    <div className="bg-black h-screen text-white">
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <h1>The allergy</h1>
      another name {getLowo()} <br />
      <br />
      <button
        className="text-white"
        onClick={() => {
          mutate({
            userInput: {
              firstName: "Oyelowo" + Math.random(),
              username: "Oyelowo" + Math.random(),
              lastName: "Oyedayo" + Math.random(),
              socialMedia: ["fd"],
              age: 19,
              password: "1234",
              email: +Math.random() + "oye@gmail.com",
            },
          });
        }}
      >
        Crate random user
      </button>
      <h1>Rogue Users</h1>
      <ul>
        {data?.users.map((el) => (
          <li key={el.id}>
            <div>First name: {el.firstName}</div>
            <div>Last name: {el.lastName}</div>
            <div>Age: {el.age}</div>
            <div>Social Media: {el.socialMedia.join(", ")}</div>
            <div>Created At: {el.createdAt}</div>
            <div>
              Posts:{" "}
              {el?.posts.map((p, i) => (
                <div key={i}>
                  <div>Title: {p.title}</div>
                  <div>Content: {p.content}</div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
}
