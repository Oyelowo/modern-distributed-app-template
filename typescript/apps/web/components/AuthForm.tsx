import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  UnstyledButton,
  Container,
  SimpleGrid,
  ActionIcon,
  Grid,
  MantineTheme,
  Footer,
  useMantineColorScheme,
  LoadingOverlay,
  Space,
} from '@mantine/core';
import { BrandGoogle, BrandGithub } from 'tabler-icons-react';
import { DOMAIN_BASE } from '../config/client';
import SignInForm from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { GoogleIcon } from './icons/GoogleIcon';
import { atom, useAtom } from 'jotai';

export const toggleAuthAtom = atom<'login' | 'register'>('login');

export default function AuthenticationForm(props: PaperProps<'div'>) {
  const [authType, setAuthType] = useAtom(toggleAuthAtom);
  // const [type, toggle] = useToggle<'login' | 'register'>('login', ['login', 'register']);
  const { colorScheme } = useMantineColorScheme();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });
  const sxOauthBtn = (t: MantineTheme) => ({
    backgroundColor: t.colorScheme === 'dark' ? t.colors.dark[9] : t.white,
  });
  return (
    <Paper
      radius="md"
      // p="xl"
      // withBorder
      // sx={(t) => ({
      //   maxWidth: 400,
      //   // backgroundColor: t.colorScheme === 'dark' ? '#19232d' : t.white,
      //   backgroundColor: t.colorScheme === 'dark' ? t.colors.dark[6] : t.white,
      // })}
      // mt="lg"
      // mx="auto"
      // style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}
      {...props}
    >
      {/* <Text size="lg" weight={500}>
        Welcome to Oyelowo App, {type} with
      </Text> */}

      <SimpleGrid cols={2} style={{ justifyItems: 'center' }}>
        <Button
          radius="lg"
          sx={sxOauthBtn}
          component="a"
          variant="default"
          href={`${DOMAIN_BASE}/oauth/signin/google`}
        >
          <ActionIcon variant="transparent" aria-label="google">
            <GoogleIcon />
          </ActionIcon>
        </Button>

        <Button
          radius="lg"
          sx={sxOauthBtn}
          component="a"
          variant="default"
          href={`${DOMAIN_BASE}/oauth/signin/github`}
        >
          <ActionIcon variant="transparent" aria-label="github">
            <BrandGithub />
          </ActionIcon>
        </Button>
      </SimpleGrid>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      {authType === 'login' ? <SignInForm /> : <SignUpForm />}
      {/* <Group direction="column" grow>
        {authType === 'login' ? <SignInForm /> : <SignUpForm />}
      </Group> */}

      {/* <Footer
        height={25}
        mt="lg"
        style={{
          marginTop: 'auto',
          // alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => setAuthType((t) => (t === 'login' ? 'register' : 'login'))}
            size="xs"
          >
            Don't have an account? {authType}
          </Anchor>
        </Group>
      </Footer> */}
    </Paper>
  );
}
