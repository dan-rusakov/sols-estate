import AgentsTable from "~/components/AgentsTable/AgentsTable";
import Header from "~/components/Header";

export default function Agents() {
  return (
    <>
      <Header />
      <div className="mb-12 mt-12"></div>
      <AgentsTable />
    </>
  );
}
