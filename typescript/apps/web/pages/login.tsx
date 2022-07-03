import { Button } from "@oyelowo/ui";
import SignInForm from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";
import { DOMAIN_BASE } from "../config/client";

// export const ButtonSexy = tw.button`bg-pink-600 m-2 py-1.5 px-7 border-radius[0.2em] text-white`;

const SignIn = () => {
  const providers = ["google", "github"] as const;

  return (
    <div className="bg-black min-h-full text-white grid-cols-2 py-28">
      <div>
        <h1>Signin with Username and password</h1>
        <SignInForm />
        <br />

        <div>
          <h1>Signin with providers</h1>
          {providers.map((p) => (
            <div key={p}>
              <Button>
                <a href={`${DOMAIN_BASE}/oauth/signin/${p}`}>
                  Sign in with <span tw="capitalize">{p}</span>
                </a>
              </Button>
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
