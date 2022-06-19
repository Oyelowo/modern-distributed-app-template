import "twin.macro";
import { TextField } from "@oyelowo/ui";
import { getGraphqlErrorMessage, SignUpSchema, useSignUp } from "../hooks/authentication";
import { useFormCustom } from "../hooks/useFormCustom";
import { ButtonSexy } from "../pages/login";

export function SignUpForm() {
  const { signUpCustom, error } = useSignUp();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormCustom(SignUpSchema, {});

  return (
    <div>
      <form
        tw="text-black grid-cols-2"
        // onSubmit={handleSubmit((d) =>
        //   signUpCustom({ ...d, age: Number(d.age), socialMedia: ["blayzfm"] })
        // )}
      >
        <div tw="text-red-400"> {getGraphqlErrorMessage(error)}</div>
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

        <br />
        <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          inputProps={{ ...register("passwordConfirm") }}
          errorMessage={errors.passwordConfirm?.message}
        />

        <br />
        <TextField
          label="Email"
          placeholder="email@example.com"
          inputProps={{ ...register("email") }}
          errorMessage={errors.email?.message}
        />

        <br />
        <TextField
          label="First Name"
          placeholder="First Name"
          inputProps={{ ...register("firstName") }}
          description="Last Name"
          errorMessage={errors.firstName?.message}
        />

        <br />
        <TextField
          label="Last Name"
          placeholder="Last Name"
          inputProps={{ ...register("lastName") }}
          // description="Last Name"
          errorMessage={errors.lastName?.message}
        />

        <br />
        {/* TODO: Use compound component instead */}
        <TextField
          label="Age(15+)"
          placeholder="Age"
          type="number"
          errorMessage={errors.age?.message}
          inputProps={{ ...register("age") }}
        />

        {/* <input type="submit" value="Sign Up" tw="text-yellow-400 bg-green-700" /> */}
        <ButtonSexy
          type="button"
          // onClick={() => signIn(providers.credentials.id)}
          onClick={() => {
            const { passwordConfirm, ...userInput } = getValues();
            signUpCustom({
              ...userInput,
              age: Number(getValues().age),
              socialMedia: ["yevibes"],
              passwordConfirm
            });
          }}
        >
          Sign up btn
        </ButtonSexy>
      </form>
    </div>
  );
}
