import { Button, Highlight, Box, Modal } from '@mantine/core';
import { useAtom } from 'jotai';
import { useState } from 'react';
import AuthenticationForm, { toggleAuthAtom } from '../components/AuthForm';
import { GetStarted } from '../components/LandingPage/LandingPage';
import SignInForm from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { DOMAIN_BASE } from '../config/client';

const SignIn = () => {
  const providers = ['google', 'github'] as const;
    const [authType, setAuthType] = useAtom(toggleAuthAtom);
    const [opened, setOpened] = useState(false);

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Modal
        size="xs"
        opened
        onClose={() => {}}
        title={`Welcome! ${authType} with,`}
      >
        <AuthenticationForm />
      </Modal>
    </Box>
  );
};

export default SignIn;
