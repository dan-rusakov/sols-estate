import { Box } from "@mui/material";
import { DataGrid, type GridPaginationModel } from "@mui/x-data-grid";
import { api } from "~/utils/api";
import { agentTypeDict } from "./utils";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import {
  TAKE_RECORDS_AMOUNT,
  TableParamsName,
  getTableParamsFromSearchParams,
} from "~/utils/table";
import { createSearchParamsString } from "~/utils/url";

export default function AgentsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { page } = getTableParamsFromSearchParams(searchParams);

  const { data: agentsData, isLoading: isAgentsLoading } =
    api.agents.getAllAgents.useQuery({
      page,
    });
  const [agentsCount, agents] = agentsData?.data ?? [];

  const rows = agents?.map((agent) => ({
    id: agent.id,
    name: `${agent.firstName} ${agent.lastName}`,
    agentType: agentTypeDict[agent.type],
    email: "",
    actions: "",
  }));

  const columns = [
    {
      field: "name",
      headerName: "Agent name",
      width: 160,
    },
    { field: "agentType", headerName: "Agency", width: 180 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "actions", headerName: "Actions", width: 190 },
  ];

  const onPageChange = (model: GridPaginationModel) => {
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          {
            name: TableParamsName.page,
            value: model.page,
          },
        ]),
    );
  };

  const tablePageNumber = () => {
    const FIRST_PAGE_INDEX = 0;

    if (rows?.length) {
      return page ?? FIRST_PAGE_INDEX;
    }

    return FIRST_PAGE_INDEX;
  };

  return (
    <div className="relative">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows ?? []}
          columns={columns}
          disableColumnMenu
          loading={isAgentsLoading}
          paginationMode="server"
          rowCount={agentsCount ?? 0}
          onPaginationModelChange={onPageChange}
          pageSizeOptions={[TAKE_RECORDS_AMOUNT]}
          paginationModel={{
            pageSize: TAKE_RECORDS_AMOUNT,
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            page: tablePageNumber(),
          }}
        />
      </Box>
    </div>
  );
}
