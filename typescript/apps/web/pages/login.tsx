import { Button, Highlight, Box } from '@mantine/core';
import { cx, TW } from '@oyelowo/ui/tailwind';
import SignInForm from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';
import { DOMAIN_BASE } from '../config/client';

const SignIn = () => {
  const providers = ['google', 'github'] as const;

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <SignInForm />

      {providers.map((p) => (
        <div key={p}>
          <Button component="a" href={`${DOMAIN_BASE}/oauth/signin/${p}`}>
            Sign in with {p}
          </Button>
          <br />
          <br />
        </div>
      ))}

      <Box>
        <SignUpForm />
      </Box>
    </Box>
  );
};

export default SignIn;
