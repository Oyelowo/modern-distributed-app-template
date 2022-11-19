import * as z from "zod";
// import { useSignUpMutation } from "@oyelowo/graphql-client";
// import { useRouter } from "next/router";
import { QueryClient } from "@tanstack/react-query";
import { client } from "../../config/client.ts";
import { GraphqlErrorResponse, GraphqlIoError } from "./helpers.tsx";

export const signUpSchema = z.object({
  username: z.string().min(1, { message: "Username must be provided" }),
  password: z.string().min(4, { message: "Invalid password" }),
  passwordConfirm: z.string().min(4, { message: "Password does not match" }),
  firstName: z.string().min(1, { message: "firstname must be provided" }),
  lastName: z.string().min(1, { message: "lastname must be provided" }),
  email: z.string().email({ message: "Invalid email address" }),
  socialMedia: z.array(z.string({ description: "socials" }), {}),
  age: z.number().min(18, {
    message: "You  must be at least 18 to setup an account",
  }),
  termsOfService: z.boolean(),
});

export function useSignUp({
  onError,
}: {
  onError: (e: GraphqlIoError) => void;
}) {
  // const router = useRouter();
  // const { mutate, data, error, isLoading } =
  //   useSignUpMutation<GraphqlErrorResponse>(client);

  // const signUpCustom = (
  //   user: Omit<
  //     z.infer<typeof signUpSchema>,
  //     "passwordConfirm" | "termsOfService"
  //   >
  // ) => {
  //   // const data = signUpSchema.parse(userData);
  //   // if (user.password !== passwordConfirm) throw new Error('Confirm password has to be the same');
  //   mutate(
  //     {
  //       user,
  //     },
  //     {
  //       onSuccess: () => {
  //         const _client = new QueryClient();
  //         // the generated useSessionQuery graphql hook uses `session` as the key
  //         router.push("/");
  //         // client.refetchQueries(["session"]);
  //       },
  //       onError: (e: GraphqlErrorResponse) => {
  //         onError(new GraphqlIoError(e));
  //       },
  //     }
  //   );
  // };

  // return { signUpCustom, data, error: new GraphqlIoError(error), isLoading };
  return {};
}
