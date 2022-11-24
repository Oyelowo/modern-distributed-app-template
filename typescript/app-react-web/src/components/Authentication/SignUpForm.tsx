import { useForm, zodResolver } from "@mantine/form";
import { useElementSize } from "@mantine/hooks";
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import z from "zod";
// import { AlertTriangle } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { useAtom } from "jotai";
import { PasswordStrength } from "./Password.jsx";
import {
  signUpSchema,
  useSignUp,
} from "../../hooks/authentication/useSignUp.jsx";
import { toggleAuthAtom } from "./atoms.jsx";

export function SignUpForm() {
  const [_authType, setAuthType] = useAtom(toggleAuthAtom);
  const { width, ref } = useElementSize<HTMLFormElement>();

  /*   const { signUpCustom, isLoading } = useSignUp({
    onError: (e) => {
      showNotification({
        title: "Registration Failed",
        message: `${e.getDetails()} 🤥`,
        color: "red",
        radius: "md",
        icon: <span>AlertTr</span>,
        // icon: <AlertTriangle size={16} />,
      });
    },
  }); */

  const form = useForm<z.infer<typeof signUpSchema>>({
    validateInputOnChange: true,
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      email: "",
      firstName: ".",
      lastName: ".",
      socialMedia: [],
      age: 18,
      termsOfService: false,
    },
    validate: {
      ...zodResolver(signUpSchema),
      passwordConfirm: (value, { password }) =>
        value === password ? null : "Password does not match",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(
        ({ passwordConfirm: _p, termsOfService: _t, ...userInput }) => {
          /*     signUpCustom({
            ...userInput,
            socialMedia: ["yevibes"],
            firstName: userInput.username,
            lastName: userInput.username,
            age: 18,
          }); */
        }
      )}
      ref={ref}
    >
      {/* <LoadingOverlay visible={isLoading} /> */}
      <TextInput
        label="Email"
        placeholder="email@example.com"
        {...form.getInputProps("email")}
      />
      <TextInput
        mt="xs"
        label="Username"
        placeholder="Username"
        required={true}
        error={form.errors.username}
        {...form.getInputProps("username")}
      />
      <PasswordStrength
        mt="xs"
        label="Password"
        placeholder="Password"
        required={true}
        width={width}
        {...form.getInputProps("password")}
      />
      <PasswordInput
        mt="xs"
        label="Confirm Password"
        placeholder="Confirm Password"
        required={true}
        {...form.getInputProps("passwordConfirm")}
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
      {/* <DatePicker
        allowFreeInput
        placeholder="Date of birth"
        label="What's your birthday?"
        required
      /> */}

      <Checkbox
        mt="xs"
        label="I agree"
        {...form.getInputProps("termsOfService", { type: "checkbox" })}
      />
      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="gray"
          onClick={() => setAuthType("login")}
          size="xs"
        >
          Have an account? Login
        </Anchor>
        <Button type="submit" /* loading={isLoading} */>Sign Up</Button>
      </Group>
    </form>
  );
}
