import { type GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Header from "~/components/Header";
import ProfileForm from "~/components/ProfileForm/ProfileForm";
import { getServerAuthSession } from "~/server/auth";

function ProfileHead() {
  return (
    <Head>
      <title>
        Sols estate: search and share estates requests - agent profile
      </title>
      <meta
        name="description"
        content="Manage your real estate agent profile on Sols Estate. View and edit your details, including links to messengers and email address. Experience the convenience of uniting with other agents and providing a personalized experience for every user in one place."
      />
      <meta
        name="keywords"
        content="Agent profile, real estate agent details, profile editing, messenger links, email change, agent networking, personalized experience, real estate platform, Sols Estate, agent unity, profile management, property requests, agent collaboration, property matchmaking"
      />
    </Head>
  );
}

export default function Profile() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return (
      <>
        <ProfileHead />
        <Header />
        <p>Access Denied</p>
      </>
    );
  }

  return (
    <>
      <ProfileHead />
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
