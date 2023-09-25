import { Alert, Button, Divider, TextField } from "@mui/material";
import { type GetServerSidePropsContext } from "next";
import { getCsrfToken } from "next-auth/react";
import { type SignInErrorTypes } from "next-auth/src/core/pages/signin";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";

interface SignInProps {
  csrfToken?: string;
}

export default function SignIn({ csrfToken }: SignInProps) {
  const router = useRouter();
  const { error: errorType } = router.query;
  const errorTypeString: string =
    (Array.isArray(errorType) ? errorType[0] : errorType) ?? "";

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const errors: Record<SignInErrorTypes, string> = {
    Signin: "Try signing in with a different account",
    OAuthSignin: "Try signing in with a different account",
    OAuthCallback: "Try signing in with a different account",
    OAuthCreateAccount: "Try signing in with a different account",
    EmailCreateAccount: "Try signing in with a different account",
    Callback: "Try signing in with a different account",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally",
    EmailSignin: "The e-mail could not be sent",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct",
    SessionRequired: "Please sign in to access this page",
    default: "Unable to sign in",
  };

  const errorText =
    errorType &&
    (errors[errorTypeString as SignInErrorTypes] ?? errors.default);

  const onSigninHandler = (evt: FormEvent) => {
    if (!email) {
      evt.preventDefault();
      setEmailError("Email must be specified");
    }
  };

  return (
    <form
      method="post"
      action="/api/auth/signin/email"
      className="m-auto flex w-full max-w-[400px] flex-col rounded p-4 pb-28"
      onSubmit={onSigninHandler}
    >
      <p className="mx-auto mb-12 text-4xl font-semibold">Sols Estate</p>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <TextField
        id="email"
        label="Email"
        type="email"
        name="email"
        variant="outlined"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
        className="mb-8 w-full"
        error={!!emailError}
        helperText={emailError}
      />
      <Button
        variant="contained"
        type="submit"
        color="indigo"
        className="w-full bg-indigo-700 normal-case"
        size="large"
        disableElevation
      >
        Login
      </Button>
      <Divider
        textAlign="center"
        role="presentation"
        className="py-3 text-sm text-neutral-400"
      >
        or
      </Divider>
      <Button
        variant="outlined"
        type="submit"
        color="indigo"
        className="w-full normal-case"
        size="large"
        disableElevation
      >
        Create account
      </Button>
      {!!errorText && (
        <Alert severity="error" className="mt-8">
          {errorText}
        </Alert>
      )}
    </form>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = (await getCsrfToken({ req: context.req })) ?? null;
  return {
    props: { csrfToken },
  };
}
