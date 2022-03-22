import "twin.macro";
import { FC, useState, useEffect, useRef } from "react";
import {
  getProviders,
  signOut,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { AriaTextFieldOptions, useTextField } from "@react-aria/textfield";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSignInMutation, useSignOutMutation } from "@oyelowo/graphql-client";
import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/dist/client/router";
import {
  useSessionReactQuery,
  useSignIn,
  useSignOut,
} from "../../hooks/authentication";

const client = new GraphQLClient("http://localhost:8080/graphql", {
  credentials: "include",
  headers: {},
});
const SignIn = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
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
        <input type="text" name="" id="" />
        <TextField label="Username" placeholder="Username" />
        <TextField
          type="password"
          label="Password"
          placeholder="abc@example.com"
        />
        <button
          type="button"
          // onClick={() => signIn(providers.credentials.id)}
          onClick={signInCustom}
        >
          Username and password Login
        </button>
      </>
      <h1>From providers</h1>
      {/* DATA!!!!: {JSON.stringify(data)} */}
      {providers?.credentials && (
        <>
          <br />
          <br />
          <input type="text" name="" id="" />
          <TextField label="Username" placeholder="Username" />
          <TextField
            type="password"
            label="Password"
            placeholder="abc@example.com"
          />
          <button
            type="button"
            // onClick={() => signIn(providers.credentials.id)}
            onClick={signInCustom}
          >
            Username and password Login
          </button>
        </>
      )}
      {providers?.github && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.github.id)}>
            Github Login Sis
          </button>
        </>
      )}
      {/*       <>
        {Object.values(providers).map((provider) => (
          <div key={provider?.name}>
            <button onClick={() => signIn(provider?.id)}>
              Sign in with {provider?.name}
            </button>
          </div>
        ))}
      </> */}
    </div>
  );
};

export default SignIn;

function TextField(props: AriaTextFieldOptions<"input">) {
  let { label } = props;
  let ref = useRef();
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
