import { TextField } from "@oyelowo/ui";
import z, { ZodType } from "zod";
import { useSignIn } from "../hooks/authentication";
import { useFormCustom } from "../hooks/useFormCustom";

export const SignInFormSchema = z.object({
  username: z
    .string()
    // .nonempty
    .min(1, { message: "Username Must be provided" })
    .max(30, { message: "Username too long" }),
  password: z
    .string()
    .min(4, { message: "Password too short" })
    .nonempty({ message: "Password must be provided" }),
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCustom(SignInFormSchema, {});

  const { signInCustom } = useSignIn();

  return (
    <div>
      <h1>Sign In</h1>
      <form tw="text-black" onSubmit={handleSubmit(signInCustom)}>
        <TextField
          label="Username"
          placeholder="Username"
          inputProps={{ ...register("username") }}
        />
        <p tw="text-red-600">{errors.username?.message}</p>

        <br />
        <TextField
          label="Password"
          placeholder="Password"
          inputProps={{ ...register("password") }}
        />
        <p tw="text-red-600">{errors.password?.message}</p>

        <input type="submit" value="Sign In" tw="text-yellow-400" />
        {/*   <button
            type="button"
            // onClick={() => signIn(providers.credentials.id)}
            onClick={signInCustom}
          >
            Username and password Login
          </button> */}
      </form>
    </div>
  );
}
