import { type GetServerSidePropsContext } from "next";
import DeclarationsFilters from "~/components/DeclarationsFilters/DeclarationsFilters";
import { getDeclarationsFiltersFromQuery } from "~/components/DeclarationsFilters/utils";
import DeclarationsTable from "~/components/DeclarationsTable/DeclarationsTable";
import Header from "~/components/Header";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { getTableParamsFromQuery } from "~/utils/table";

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
  const { location, priceMin, priceMax } = getDeclarationsFiltersFromQuery(
    context.query,
  );
  const { page } = getTableParamsFromQuery(context.query);
  const ssg = generateSSGHelper();

  await Promise.all([
    ssg.declarations.getAllDeclarations.prefetch({
      location,
      page,
      priceMin,
      priceMax,
    }),
    ssg.locationDict.getAllDistricts.prefetch(),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
