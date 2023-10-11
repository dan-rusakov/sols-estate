import { type GetServerSidePropsContext } from "next";
import AgentsFilters from "~/components/AgentsFilters/AgentsFilters";
import AgentsTable from "~/components/AgentsTable/AgentsTable";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default function Agents() {
  return (
    <>
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
