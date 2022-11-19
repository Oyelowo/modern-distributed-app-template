import {
  ActionIcon,
  Button,
  Divider,
  Paper,
  PaperProps,
  SimpleGrid,
} from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";
import { useAtom } from "jotai";
import { DOMAIN_BASE } from "../../config/client.ts";
import SignInForm from "./SignInForm.tsx";
import { SignUpForm } from "./SignUpForm.tsx";
import { GoogleIcon } from "../icons/GoogleIcon.tsx";
import { toggleAuthAtom } from "./atoms.tsx";

export function AuthenticationForm(props: PaperProps) {
  const [authType, _setAuthType] = useAtom(toggleAuthAtom);

  return (
    <Paper radius="md" {...props}>
      <SimpleGrid cols={2} style={{ justifyItems: "center" }}>
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
      {authType === "login" ? <SignInForm /> : <SignUpForm />}
    </Paper>
  );
}
