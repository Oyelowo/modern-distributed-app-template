import z, { ZodType } from 'zod';
import { useSignIn } from '../hooks/authentication';
// import { useFormCustom } from '../hooks/useFormCustom';
import { useForm, zodResolver } from '@mantine/form';
import { useForceUpdate } from '@mantine/hooks';
import { upperFirst } from '@mantine/hooks';
import {
  NumberInput,
  PasswordInput,
  TextInput,
  Button,
  Box,
  Group,
  Checkbox,
  Alert,
  createStyles,
  Anchor,
  LoadingOverlay,
} from '@mantine/core';
import { AlertCircle, AlertTriangle } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { useAtom } from 'jotai';
import { toggleAuthAtom } from './AuthForm';

export const signInSchema = z.object({
  username: z
    .string()
    // .nonempty
    .min(1, { message: 'Username Must be provided' })
    .max(30, { message: 'Username too long' }),
  password: z.string().min(1, { message: 'Password is empty' }),
});

// const useStyles = createStyles((theme) => {
//   color: theme.colors.red[6];
// });
export default function SignInForm() {
  const [authType, setAuthType] = useAtom(toggleAuthAtom);
  const forceRerender = useForceUpdate();
  // const forceRerenderr = useForceRerender();

  // const styles = useStyles();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useFormCustom(SignInFormSchema, {});
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
        message: e.getDetails() + ' 🤥',
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
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Username"
        placeholder="Username"
        {...form.getInputProps('username')}
        // error={error.getDetails()}
      />
      <br />
      <PasswordInput label="Password" placeholder="Password" {...form.getInputProps('password')} />
      {/* <Group position="right" mt="xl">
        <Button type="submit" loading={isLoading}>Login</Button>
      </Group> */}
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
        <Button type="submit">Login</Button>
      </Group>
    </form>
  );
}
