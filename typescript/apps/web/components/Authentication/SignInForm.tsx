import z from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useForceUpdate } from '@mantine/hooks';
import { PasswordInput, TextInput, Button, Group, Anchor } from '@mantine/core';
import { AlertTriangle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { useAtom } from 'jotai';
import { useSignIn } from '../../hooks/authentication/useSignIn';
import { toggleAuthAtom } from './atoms';

export const signInSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username Must be provided' })
    .max(30, { message: 'Username too long' }),
  password: z.string().min(1, { message: 'Password is empty' }),
});

export default function SignInForm() {
  const [authType, setAuthType] = useAtom(toggleAuthAtom);
  const forceRerender = useForceUpdate();
  const form = useForm<z.infer<typeof signInSchema>>({
    schema: zodResolver(signInSchema),
    initialValues: {
      username: '',
      password: '',
    },
  });

  const { signInCustom, error, isLoading } = useSignIn({
    onError: (e) => {
      showNotification({
        title: 'Authentication Failed',
        message: `${e.getDetails()} 🤥`,
        color: 'red',
        radius: 'md',
        icon: <AlertTriangle size={16} />,
      });
    },
    onSuccess: () => {
      forceRerender();
    },
  });

  return (
    <form onSubmit={form.onSubmit(signInCustom)}>
      {/* <LoadingOverlay visible={isLoading} /> */}
      <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
      <br />
      <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="gray"
          onClick={() => setAuthType('register')}
          size="xs"
        >
          Don't have an account? Register
        </Anchor>
        <Button type="submit" loading={isLoading}>
          Login
        </Button>
      </Group>
    </form>
  );
}
