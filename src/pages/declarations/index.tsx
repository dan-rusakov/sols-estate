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
