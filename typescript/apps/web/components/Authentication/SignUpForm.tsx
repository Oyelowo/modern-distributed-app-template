import { useForm, zodResolver } from '@mantine/form';
import { useElementSize } from '@mantine/hooks';
import { TextInput, PasswordInput, Button, Group, Checkbox, Anchor } from '@mantine/core';
import z from 'zod';
import { AlertTriangle } from 'tabler-icons-react';
import React from 'react';
import { showNotification } from '@mantine/notifications';
import { useAtom } from 'jotai';
import { PasswordStrength } from './Password';
import { signUpSchema } from '../../hooks/authentication/useSignUp';
import { useSignUp } from '../../hooks/authentication/useSignUp';
import { toggleAuthAtom } from './atoms';

export function SignUpForm() {
  const [_authType, setAuthType] = useAtom(toggleAuthAtom);
  const { width, ref } = useElementSize<HTMLFormElement>();

  const { signUpCustom } = useSignUp({
    onError: (e) => {
      showNotification({
        title: 'Registration Failed',
        message: `${e.getDetails()} 🤥`,
        color: 'red',
        radius: 'md',
        icon: <AlertTriangle size={16} />,
      });
    },
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    schema: zodResolver(signUpSchema),
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      firstName: '',
      lastName: '',
      socialMedia: [],
      age: 0,
      termsOfService: false,
    },
    validate: {
      passwordConfirm: (value, { password }) =>
        value === password ? null : 'Password does not match',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(({ passwordConfirm, termsOfService, ...userInput }) => {
        signUpCustom({
          ...userInput,
          socialMedia: ['yevibes'],
        });
      })}
      ref={ref}
    >
      {/* <LoadingOverlay visible={isLoading} /> */}
      <TextInput label="Email" placeholder="email@example.com" {...form.getInputProps('email')} />

      <TextInput
        mt="xs"
        label="Username"
        placeholder="Username"
        required
        error={form.errors.username}
        {...form.getInputProps('username')}
      />

      <PasswordStrength
        mt="xs"
        label="Password"
        placeholder="Password"
        required
        width={width}
        {...form.getInputProps('password')}
      />

      <PasswordInput
        mt="xs"
        label="Confirm Password"
        placeholder="Confirm Password"
        required
        {...form.getInputProps('passwordConfirm')}
      />

      {/* <SimpleGrid
        mt="xs"
        cols={1}
        breakpoints={[
          {
            minWidth: 'xs',
            cols: 2,
          },
        ]}
      >
        <TextInput
          label="First Name"
          placeholder="First Name"
          {...form.getInputProps('firstName')}
        />

        <TextInput label="Last Name" placeholder="Last Name" {...form.getInputProps('lastName')} />
      </SimpleGrid> */}

      {/* <NumberInput
        mt="xs"
        label="Age(18+)"
        defaultValue={18}
        placeholder="Age"
        required
        stepHoldDelay={500}
        stepHoldInterval={100}
        {...form.getInputProps('age')}
      /> */}

      <Checkbox
        mt="xs"
        label="I agree"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="gray"
          onClick={() => setAuthType('login')}
          size="xs"
        >
          Have an account? Login
        </Anchor>
        <Button type="submit">Sign Up</Button>
      </Group>
    </form>
  );
}
