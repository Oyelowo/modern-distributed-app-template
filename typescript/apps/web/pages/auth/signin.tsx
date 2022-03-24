import "twin.macro";
import {
  FC,
  useState,
  useEffect,
  useRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import {
  getProviders,
  signOut,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { AriaTextFieldOptions, useTextField } from "@react-aria/textfield";
import { useSignInMutation, useSignOutMutation } from "@oyelowo/graphql-client";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/dist/client/router";
import {
  useSessionReactQuery,
  useSignIn,
  useSignOut,
} from "../../hooks/authentication";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const client = new GraphQLClient("http://localhost:8080/graphql", {
  credentials: "include",
  headers: {},
});

const SignInFormSchema = z.object({
  username: z
    .string()
    // .nonempty
    .min(1, { message: "Username Must be provided" })
    .max(30, { message: "Username too long" }),
  password: z
    .string()
    .min(4, { message: "Password too short" })
    .nonempty({ message: "Password must be provided" }),
});

const SignIn = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<z.infer<typeof SignInFormSchema>>({
    reValidateMode: "onChange",
    mode: "all",
    resolver: zodResolver(SignInFormSchema),
  });
  // const k = useTextField({label})
  const { signInCustom } = useSignIn();
  const { signOutCustom } = useSignOut();

  const { session, isLoading } = useSessionReactQuery({
    required: true,
    redirectTo: "http://localhost:8080",
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  });

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setProviders(setupProviders);
    };
    setTheProviders();
  }, []);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user?.email} <br />
  //       {/* <button type="button" onClick={() => signOut()}> */}
  //       <button type="button" onClick={signOutCustom}>
  //         Sign out
  //       </button>
  //     </>
  //   );
  // }
  return (
    <div tw="bg-black h-screen text-white">
      Not signed in but in the custom pageeeeee!
      <br />
      {/* <button type="button" onClick={() => signIn()}>
        Sign in
      </button> */}
      {providers?.email && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.email.id)}>
            Email Login Bro
          </button>
        </>
      )}
      <h1>From Custom</h1>
      <>
        <br />
        <br />
        <form
          tw="text-black"
          onSubmit={handleSubmit((d) => {
            console.log("formdata", d);
            // signInCustom({...d});
            signInCustom({ username: d.username, password: d.password });
          })}
        >
          <br />
          <br />
          <br />
          <input tw="text-black" {...register("username")} />
          {errors.username?.message && (
            <p tw="text-red-600">{errors.username?.message}</p>
          )}

          <br />
          <br />
          <br />
          <input tw="text-black" type="password" {...register("password")} />
          {errors.password?.message && (
            <p tw="text-red-600">{errors.password?.message}</p>
          )}

          <br />
          <br />
          <br />

          {/* <TextField
            label="Username"
            placeholder="Username"
            {...register("username")}
          />

          <TextField label="Username" placeholder="Username" />
          <TextField
            type="password"
            label="Password"
            placeholder="abc@example.com"
          /> */}

          <input type="submit" value="Sign in" tw="text-yellow-400" />
          {/*   <button
            type="button"
            // onClick={() => signIn(providers.credentials.id)}
            onClick={signInCustom}
          >
            Username and password Login
          </button> */}
        </form>
      </>
      <h1>From providers</h1>
      {/* DATA!!!!: {JSON.stringify(data)} */}
      {providers?.github && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.github.id)}>
            Github Login Sis
          </button>
        </>
      )}
      <>
        {Object.values(providers ?? {}).map((provider) => (
          <div key={provider?.name}>
            <button onClick={() => signIn(provider?.id)}>
              Sign in with {provider?.name}
            </button>
          </div>
        ))}
      </>
    </div>
  );
};

export default SignIn;

// function TextField(props: AriaTextFieldOptions<"input">) {
function TextField(props: AriaTextFieldOptions<"input"> & any) {
  let { label } = props;
  let ref = useRef<HTMLInputElement>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
      }}
    >
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}
