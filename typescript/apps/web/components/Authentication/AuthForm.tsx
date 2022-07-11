import { Paper, PaperProps, Button, Divider, SimpleGrid, ActionIcon } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';
import { useAtom } from 'jotai';
import { DOMAIN_BASE } from '../../config/client';
import SignInForm from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { GoogleIcon } from '../icons/GoogleIcon';
import { toggleAuthAtom } from './atoms';

export function AuthenticationForm(props: PaperProps<'div'>) {
  const [authType, _setAuthType] = useAtom(toggleAuthAtom);

  return (
    <Paper radius="md" {...props}>
      <SimpleGrid cols={2} style={{ justifyItems: 'center' }}>
        <Button
          radius="lg"
          component="a"
          variant="default"
          href={`${DOMAIN_BASE}/oauth/signin/google`}
          leftIcon={
            <ActionIcon variant="transparent" size="sm" aria-label="google">
              <GoogleIcon />
            </ActionIcon>
          }
        >
          Google
        </Button>

        <Button
          radius="lg"
          component="a"
          variant="default"
          href={`${DOMAIN_BASE}/oauth/signin/github`}
          leftIcon={
            <ActionIcon variant="transparent" aria-label="github">
              <BrandGithub />
            </ActionIcon>
          }
        >
          Github
        </Button>
      </SimpleGrid>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />
      {authType === 'login' ? <SignInForm /> : <SignUpForm />}
    </Paper>
  );
}
