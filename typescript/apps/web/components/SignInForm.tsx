import { Button } from "@oyelowo/ui/components";
import { TextField } from "@oyelowo/ui";
import z, { ZodType } from "zod";
import { useSignIn } from "../hooks/authentication";
import { useFormCustom } from "../hooks/useFormCustom";
import { cx, TW } from "@oyelowo/ui/tailwind";

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

  const { signInCustom, error, isLoading } = useSignIn();

  return (
    <div>
      <form onSubmit={handleSubmit(signInCustom)}>
        <div className={cx(TW.textColor("text-red-300"))}> {error.getDetails()}</div>
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

        <Button className={[isLoading && "loading", "disabled"]}>
          Sign In
          <input type="submit" hidden />
        </Button>
      </form>
    </div>
  );
}
