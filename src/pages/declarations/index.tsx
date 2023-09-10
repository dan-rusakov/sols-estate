import { type GetServerSideProps } from "next";
import DeclarationsFilters from "~/components/DeclarationsFilters/DeclarationsFilters";
import { getDeclarationsFiltersFromQuery } from "~/components/DeclarationsFilters/utils";
import DeclarationsTable from "~/components/DeclarationsTable/DeclarationsTable";
import Header from "~/components/Header";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

export default function Declarations() {
  return (
    <>
      <Header />
      <div className="mb-12">
        <p>Filters</p>
        <DeclarationsFilters />
      </div>
      <DeclarationsTable />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { location } = getDeclarationsFiltersFromQuery(context.query);
  const ssg = await generateSSGHelper(context);

  await Promise.all([
    ssg.declarations.getAllDeclarations.prefetch({ location }),
    ssg.locationDict.getAllDistricts.prefetch(),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
