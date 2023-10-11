import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import AgentsFilters from "~/components/AgentsFilters/AgentsFilters";
import AgentsTable from "~/components/AgentsTable/AgentsTable";
import Header from "~/components/Header";

export default function Agents() {
  return (
    <>
      <Header />
      <div className="mb-12 mt-12">
        <AgentsFilters />
      </div>
      <AgentsTable />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

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
