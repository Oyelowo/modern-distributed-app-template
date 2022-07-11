import { useState } from 'react';
import { Button, Group, Modal, ButtonProps } from '@mantine/core';
import { useAtom } from 'jotai';
import { AuthenticationForm } from '../Authentication/AuthForm';
import { toggleAuthAtom } from '../Authentication/atoms';

export function GetStarted(props: ButtonProps<'button'>) {
  const [authType, setAuthType] = useAtom(toggleAuthAtom);
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        size="xs"
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Welcome! ${authType} with`}
      >
        <AuthenticationForm />
      </Modal>

      <Group position="center">
        <Button
          onClick={() => {
            setOpened(true);
            setAuthType('register');
          }}
          variant="gradient"
          {...props}
        >
          Get Started
        </Button>
      </Group>
    </>
  );
}
