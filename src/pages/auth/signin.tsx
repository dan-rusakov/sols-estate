import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import { type GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import { getServerAuthSession } from "~/server/auth";

type SignInErrorTypes =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired"
  | "default";

export default function SignIn() {
  const router = useRouter();
  const { error: errorType } = router.query;
  const errorTypeString: string =
    (Array.isArray(errorType) ? errorType[0] : errorType) ?? "";

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const onSigninHandler = async (evt: FormEvent) => {
    evt.preventDefault();

    if (!email) {
      setEmailError("Email must be specified");
    }

    try {
      setIsLoading(true);
      await signIn("email", { email });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sols estate: search and share estates requests - sign in</title>
        <meta
          name="description"
          content="Join Sols Estate and access the future of real estate collaboration. Create a new account or log in to your existing account as a real estate agent. Experience the convenience of uniting with other agents and providing a personalized experience for every user in one place."
        />
        <meta
          name="keywords"
          content="Real estate agent sign-in, account creation, agent login, real estate collaboration, agent registration, account access, personalized experience, real estate platform, Sols Estate, agent unity, property requests, agent networking, property matchmaking"
        />
      </Head>
      <form
        className="m-auto flex w-full max-w-[400px] flex-col rounded p-4 pb-28"
        onSubmit={(evt) => void onSigninHandler(evt)}
      >
        <p className="mx-auto mb-12 text-4xl font-semibold">Sols Estate</p>
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
          endIcon={isLoading && <CircularProgress size={16} color="inherit" />}
          disabled={isLoading}
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
          endIcon={isLoading && <CircularProgress size={16} color="inherit" />}
          disabled={isLoading}
        >
          Create account
        </Button>
        {!!errorText && (
          <Alert severity="error" className="mt-8">
            {errorText}
          </Alert>
        )}
      </form>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
