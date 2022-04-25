import { TextField } from "@oyelowo/ui";
import { SignUpSchema, useSignUp } from "../hooks/authentication";
import { useFormCustom } from "../hooks/useFormCustom";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormCustom(SignUpSchema, {});

  // const k = useTextField({label})
  const { signUpCustom } = useSignUp();

  return (
    <div>
      <h1>Sign Up</h1>
      <form tw="text-black" onSubmit={handleSubmit(signUpCustom)}>
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

        <br />
        <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          inputProps={{ ...register("passwordConfirm") }}
        />

        <p tw="text-red-600">{errors.passwordConfirm?.message}</p>

        <br />
        <TextField
          label="Email"
          placeholder="email@example.com"
          inputProps={{ ...register("email") }}
        />
        <p tw="text-red-600">{errors.email?.message}</p>

        <br />
        <TextField
          label="First Name"
          placeholder="First Name"
          inputProps={{ ...register("firstName") }}
        />
        <p tw="text-red-600">{errors.firstName?.message}</p>

        <br />
        <TextField
          label="Last Name"
          placeholder="Last Name"
          inputProps={{ ...register("lastName") }}
        />

        <br />
        <TextField
          label="Age(15+)"
          placeholder="Age"
          inputProps={{ ...register("age") }}
        />

        <p tw="text-red-600">{errors.lastName?.message}</p>

        <input type="submit" value="Sign Up" tw="text-yellow-400 bg-red-500" />
        <br />
        <button
          type="button"
          // onClick={() => signIn(providers.credentials.id)}
          onClick={() => {
            signUpCustom({ ...getValues(), socialMedia: ["yevibes"] });
          }}
        >
          Sign up btn
        </button>
      </form>
    </div>
  );
}
