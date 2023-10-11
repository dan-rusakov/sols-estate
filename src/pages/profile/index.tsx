import { type GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Header from "~/components/Header";
import ProfileForm from "~/components/ProfileForm/ProfileForm";
import { getServerAuthSession } from "~/server/auth";

export default function Profile() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <>
        <Header />
        <p>Access Denied</p>
      </>
    );
  }

  return (
    <>
      <Header />
      <ProfileForm />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session?.user.status === "NEW") {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/create-agent",
      },
      props: { session },
    };
  }

  return {
    props: {
      session,
    },
  };
}
