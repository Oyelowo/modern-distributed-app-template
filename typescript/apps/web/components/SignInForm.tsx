import { Button, TextField } from "@oyelowo/ui";
import z, { ZodType } from "zod";
import { useSignIn } from "../hooks/authentication";
import { useFormCustom } from "../hooks/useFormCustom";

export const SignInFormSchema = z.object({
  username: z
    .string()
    // .nonempty
    .min(1, { message: "Username Must be provided" })
    .max(30, { message: "Username too long" }),
  password: z.string().min(4, { message: "Password too short" }),
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCustom(SignInFormSchema, {});

  const { signInCustom, error } = useSignIn();

  return (
    <div>
      <form className="text-black" onSubmit={handleSubmit(signInCustom)}>
        <div className="text-red-400"> {error.getDetails()}</div>
        <TextField
          label="Username"
          placeholder="Username"
          inputProps={{ ...register("username") }}
          errorMessage={errors.username?.message}
        />

        <br />
        <TextField
          label="Password"
          placeholder="Password"
          inputProps={{ ...register("password") }}
          errorMessage={errors.password?.message}
        />

        <Button>
          <input type="submit" value="Sign In" className="text-yellow-400" />
        </Button>
      </form>
    </div>
  );
}
