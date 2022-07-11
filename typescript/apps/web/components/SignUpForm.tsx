// import { Button, TextInput } from '@mantine/core';
import { signUpSchema, useSignUp } from '../hooks/authentication';
// import { useFormCustom } from '../hooks/useFormCustom';
import { useForm, zodResolver } from '@mantine/form';
import { useElementSize } from '@mantine/hooks';
import {
  NumberInput,
  TextInput,
  PasswordInput,
  Button,
  Box,
  Group,
  Checkbox,
  Modal,
  Grid,
  SimpleGrid,
  Anchor,
  LoadingOverlay,
} from '@mantine/core';
import z from 'zod';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import { PasswordStrength } from './Password';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { AlertCircle, AlertTriangle } from 'tabler-icons-react';
import { useAtom } from 'jotai';
import { toggleAuthAtom } from './AuthForm';

export function SignUpForm() {
  const [authType, setAuthType] = useAtom(toggleAuthAtom);
  const { width, ref } = useElementSize<HTMLFormElement>();

  const { signUpCustom, error, isLoading } = useSignUp({
    onError: (e) => {
      showNotification({
        title: 'Registration Failed',
        message: e.getDetails() + ' 🤥',
        color: 'red',
        radius: 'md',
        icon: <AlertTriangle size={16} />,
      });
    },
  });
  // const {
  //   form.getInputProps,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = useForm(SignUpSchema, {});
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

      {/* <Group position="right" mt="xl">
        <Button type="submit" loading={isLoading}>
          Sign Up
        </Button>
      </Group> */}

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

// export function SignUpFormModal() {
//   const [opened, setOpened] = useState(false);

//   return (
//     <>
//       <Modal opened={opened} onClose={() => setOpened(false)}>
//         <SignUpForm />
//       </Modal>

//       <Group position="center">
//         <Button onClick={() => setOpened(true)} variant="gradient">
//           Create Account
//         </Button>
//       </Group>
//     </>
//   );
// }
