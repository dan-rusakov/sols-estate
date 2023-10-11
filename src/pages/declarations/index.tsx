import { type GetServerSidePropsContext } from "next";
import DeclarationsFilters from "~/components/DeclarationsFilters/DeclarationsFilters";
import DeclarationsTable from "~/components/DeclarationsTable/DeclarationsTable";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

export default function Declarations() {
  return (
    <>
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
