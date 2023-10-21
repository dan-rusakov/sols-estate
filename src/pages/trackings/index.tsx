import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import Header from "~/components/Header";
import TrackingsActions from "~/components/TrackingsActions/TrackingsActions";
import TrackingsTable from "~/components/TrackingsTable/TrackingsTable";
import { getServerAuthSession } from "~/server/auth";

export default function Trackings() {
  return (
    <>
      <Head>
        <title>
          Sols estate: search and share estates requests - trackings list
        </title>
        <meta
          name="description"
          content="Effortlessly monitor your specific real estate preferences with tracking on Sols Estate. View a list of your saved trackings, which automatically alert you when new requests match your criteria. Each tracking includes location, property type, price range, room count, commission, and the option to delete a tracking setting."
        />
        <meta
          name="keywords"
          content="Real estate tracking, request monitoring, tracking settings, property preferences, agent alerts, tracking criteria, automated notifications, location tracking, property type preferences, price range tracking, commission monitoring, tracking management, personalized experience, agent collaboration, property matchmaking, Sols Estate"
        />
      </Head>
      <Header />
      <div className="my-12 sm:mb-8">
        <TrackingsActions />
      </div>
      <TrackingsTable />
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
