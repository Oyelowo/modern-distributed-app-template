// import { Button, TextInput } from '@mantine/core';
import { signUpSchema, useSignUp } from '../hooks/authentication';
// import { useFormCustom } from '../hooks/useFormCustom';
import { useForm, zodResolver } from '@mantine/form';
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
} from '@mantine/core';
import z from 'zod';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import { PasswordStrength } from './Password';
import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { AlertCircle, AlertTriangle } from 'tabler-icons-react';

export function Content() {
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
    >
      <TextInput
        mt="xs"
        label="Username"
        placeholder="Username"
        required
        {...form.getInputProps('username')}
      />

      <PasswordStrength
        mt="xs"
        label="Password"
        placeholder="Password"
        required
        {...form.getInputProps('password')}
      />

      <PasswordInput
        mt="xs"
        label="Confirm Password"
        placeholder="Confirm Password"
        required
        {...form.getInputProps('passwordConfirm')}
      />

      <TextInput label="Email" placeholder="email@example.com" {...form.getInputProps('email')} />

      <SimpleGrid
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
      </SimpleGrid>

      <NumberInput
        mt="xs"
        label="Age(18+)"
        defaultValue={18}
        placeholder="Age"
        required
        stepHoldDelay={500}
        stepHoldInterval={100}
        {...form.getInputProps('age')}
      />

      <Checkbox
        mt="xs"
        label="I agree"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />

      <Group position="right" mt="md">
        <Button type="submit" loading={isLoading}>
          Sign up
        </Button>
      </Group>
    </form>
  );
}

export function SignUpForm() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
        <Content />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Create Account</Button>
      </Group>
    </>
  );
}
