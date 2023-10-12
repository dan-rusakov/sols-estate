import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import AgentsFilters from "~/components/AgentsFilters/AgentsFilters";
import AgentsTable from "~/components/AgentsTable/AgentsTable";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default function Agents() {
  return (
    <>
      <Head>
        <title>
          Sols estate: search and share estates requests - agents list
        </title>
        <meta
          name="description"
          content="Discover and connect with a network of real estate agents specializing in villas, condos, and townhouses on Sols Estate. Explore agent profiles, add favorites, create blacklists, and use advanced filters to streamline your real estate search. Your one-stop platform for a personalized and efficient real estate experience as an agent."
        />
        <meta
          name="keywords"
          content="Real estate agents, estate agent listings, villa agents, condo agents, townhouse agents, agent profiles, agent network, favorites, blacklist, filter agents, personalized experience, real estate requests, property exchange, real estate platform, rental agent search, estate agent network, efficient real estate, agent discovery, request sharing, personalized real estate, property search, Sols Estate"
        />
      </Head>
      <Header />
      <div className="my-12 sm:mb-8">
        <AgentsFilters />
      </div>
      <AgentsTable />
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
