import { type GetServerSidePropsContext } from "next";
import Head from "next/head";
import DeclarationsFilters from "~/components/DeclarationsFilters/DeclarationsFilters";
import DeclarationsTable from "~/components/DeclarationsTable/DeclarationsTable";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default function Declarations() {
  return (
    <>
      <Head>
        <title>
          Sols estate: search and share estates requests - requests list
        </title>
        <meta
          name="description"
          content="Explore a comprehensive listing of real estate rental requests on Sols Estate. View requests for villas, condos, and townhouses, complete with essential details like location, price, check-in/check-out dates, room count, and agent information. Filter requests by location, price, rooms, or estate type to find the perfect match. Experience the convenience of uniting agents and clients in one place for a personalized real estate journey."
        />
        <meta
          name="keywords"
          content="Real estate requests, property search, villa requests, condo requests, townhouse requests, request listings, location-based requests, estate type filters, price filters, room count filters, personalized real estate, agent commissions, request messaging, agent contact, property search platform, unified real estate, efficient property requests, Sols Estate"
        />
      </Head>
      <Header />
      <div className="my-12 sm:mb-8">
        <DeclarationsFilters />
      </div>
      <DeclarationsTable />
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
