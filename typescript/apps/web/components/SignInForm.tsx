import { Button, TextInput, Group } from '@mantine/core';
import z, { ZodType } from 'zod';
import { useSignIn } from '../hooks/authentication';
import { useFormCustom } from '../hooks/useFormCustom';
import { cx, TW } from '@oyelowo/ui/tailwind';

export const SignInFormSchema = z.object({
  username: z
    .string()
    // .nonempty
    .min(1, { message: 'Username Must be provided' })
    .max(30, { message: 'Username too long' }),
  password: z.string().min(4, { message: 'Password too short' }),
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
        <div className={cx(TW.textColor('text-red-300'))}> {error.getDetails()}</div>

        <TextInput label="Username" placeholder="Username" {...register('username')} />

        <br />
        <TextInput label="Password" placeholder="Password" {...register('password')} />

        <Group position="left" mt="md">
          <Button type="submit" loading={isLoading}>
            Sign In
          </Button>
        </Group>
      </form>
    </div>
  );
}
