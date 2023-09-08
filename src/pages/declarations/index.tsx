import { type GetServerSideProps } from "next";
import DeclarationsTable from "~/components/DeclarationsTable/DeclarationsTable";
import Header from "~/components/Header";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

export default function Declarations() {
  const { data: declarations } = api.declarations.getAllDeclarations.useQuery();

  return (
    <>
      <Header />
      <div className="mb-12">
        <p>Filters</p>
      </div>
      <DeclarationsTable declarations={declarations} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = await generateSSGHelper(context);

  await ssg.declarations.getAllDeclarations.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
