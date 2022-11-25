import * as z from "zod";
// import { SignInMutation, useSignInMutation } from "@oyelowo/graphql-client";
// import { useRouter } from "next/router";
import { QueryClient } from "@tanstack/react-query";
import { client } from "../../config/client.js";
import { GraphqlErrorResponse, GraphqlIoError } from "./helpers.js";

export const signInSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username Must be provided" })
    .max(30, { message: "Username too long" }),
  password: z.string().min(1, { message: "Password is empty" }),
});

export function useSignIn({
  onError,
}: // onSuccess,
{
  onError: (e: GraphqlIoError) => void;
  // onSuccess: (data: SignInMutation) => void;
}) {
  // const router = useRouter();

  // const { mutate, data, error, isLoading } =
  //   useSignInMutation<GraphqlErrorResponse>(client);

  // const signInCustom = ({
  //   username,
  //   password,
  // }: z.infer<typeof signInSchema>) => {
  //   mutate(
  //     {
  //       signInCredentials: {
  //         username,
  //         password,
  //       },
  //     },
  //     {
  //       onSuccess: (responseData) => {
  //         const queryClient = new QueryClient();
  //         queryClient.refetchQueries(["session"]);
  //         onSuccess(responseData);
  //         router.push("/");
  //       },
  //       onError: (e) => {
  //         onError(new GraphqlIoError(e));
  //       },
  //     }
  //   );
  // };

  // return { signInCustom, data, error: new GraphqlIoError(error), isLoading };
  return {};
}
