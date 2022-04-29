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
  SignUpSchema,
  useSessionReactQuery,
  useSignIn,
  useSignOut,
  useSignUp,
} from "../../hooks/authentication";
import { useForm, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignInForm from "../../components/SignInForm";
import { SignUpForm } from "../../components/SignUpForm";
import { DOMAIN_BASE } from "../../config/client";

const client = new GraphQLClient(`${DOMAIN_BASE}:8080/graphql`, {
  credentials: "include",
  headers: {},
});

const SignIn = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  const { signInCustom } = useSignIn();

  const { session, isLoading } = useSessionReactQuery({
    required: true,
    redirectTo: `${DOMAIN_BASE}:8080`,
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

  return (
    <div tw="bg-black min-h-full text-white grid-cols-2">
      <div>
        <h1>Signin with Username and password</h1>
        <SignInForm />
        <br />

        <div>
          <h1>Signin with providers</h1>
          {Object.values(providers ?? {}).map((provider) => (
            <div key={provider?.name}>
              <button onClick={() => signIn(provider?.id)}>
                Sign in with {provider?.name}
              </button>
              <br />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>Signup</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignIn;
