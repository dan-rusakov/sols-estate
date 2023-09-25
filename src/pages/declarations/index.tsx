import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import DeclarationsFilters from "~/components/DeclarationsFilters/DeclarationsFilters";
import DeclarationsTable from "~/components/DeclarationsTable/DeclarationsTable";
import Header from "~/components/Header";

export default function Declarations() {
  return (
    <>
      <Header />
      <div className="mb-12 mt-12">
        <DeclarationsFilters />
      </div>
      <DeclarationsTable />
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
