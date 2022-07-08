import { Button, TextInput } from '@mantine/core';
import { SignUpSchema, useSignUp } from '../hooks/authentication';
import { useFormCustom } from '../hooks/useFormCustom';

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
        className="text-black grid-cols-2"
        // onSubmit={handleSubmit((d) =>
        //   signUpCustom({ ...d, age: Number(d.age), socialMedia: ["blayzfm"] })
        // )}
      >
        <div className="text-red-400"> {error.getDetails()}</div>
        <TextInput label="Username" placeholder="Username" {...register('username')} />

        <br />
        <TextInput label="Password" placeholder="Password" {...register('password')} />

        <br />
        <TextInput
          label="Confirm Password"
          placeholder="Confirm Password"
          {...register('passwordConfirm')}
        />

        <br />
        <TextInput label="Email" placeholder="email@example.com" {...register('email')} />

        <br />
        <TextInput label="First Name" placeholder="First Name" {...register('firstName')} />

        <br />
        <TextInput label="Last Name" placeholder="Last Name" {...register('lastName')} />

        <br />
        {/* TODO: Use compound component instead */}
        <TextInput label="Age(15+)" placeholder="Age" type="number" {...register('age')} />

        {/* <input type="submit" value="Sign Up" className="text-yellow-400 bg-green-700" /> */}
        <Button
          type="button"
          // onClick={() => signIn(providers.credentials.id)}
          onClick={() => {
            const { passwordConfirm, ...userInput } = getValues();
            signUpCustom({
              ...userInput,
              age: Number(getValues().age),
              socialMedia: ['yevibes'],
              passwordConfirm,
            });
          }}
        >
          Sign up btn
        </Button>
      </form>
    </div>
  );
}
