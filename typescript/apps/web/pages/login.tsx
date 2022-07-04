import { Button } from "@oyelowo/ui/components";
import { cx, TW } from "@oyelowo/ui/tailwind";
import SignInForm from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";
import { DOMAIN_BASE } from "../config/client";

const SignIn = () => {
  const providers = ["google", "github"] as const;

  return (
    <div className={cx(TW.backgroundColor("bg-black"))}>
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
                  Sign in with <span>{p.toLocaleUpperCase()}</span>
                </a>
              </Button>
              <br />
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
