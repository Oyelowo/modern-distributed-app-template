import { useState } from "react";
import { Button, ButtonProps, Group, Modal } from "@mantine/core";
import { useAtom } from "jotai";
import { AuthenticationForm } from "../Authentication/AuthForm.jsx";
import { toggleAuthAtom } from "../Authentication/atoms.jsx";

export function GetStarted(props: ButtonProps) {
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
            setAuthType("register");
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
