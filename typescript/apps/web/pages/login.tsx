import { Box, Modal } from '@mantine/core';
import { useAtom } from 'jotai';
import { toggleAuthAtom } from '../components/Authentication/atoms';
import { AuthenticationForm } from '../components/Authentication/AuthForm';

const SignIn = () => {
  const [authType, _setAuthType] = useAtom(toggleAuthAtom);

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Modal
        size="xs"
        opened
        withCloseButton={false}
        onClose={() => {}}
        title={`Welcome! ${authType} with`}
      >
        <AuthenticationForm />
      </Modal>
    </Box>
  );
};

export default SignIn;
