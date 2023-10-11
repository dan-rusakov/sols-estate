import { Box } from "@mui/material";
import {
  DataGrid,
  type GridRenderCellParams,
  type GridPaginationModel,
} from "@mui/x-data-grid";
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
import AgentActions from "./AgentActions";
import { useSession } from "next-auth/react";
import { getAgentsFiltersFromSearchParams } from "../AgentsFilters/utils";

export default function AgentsTable() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { page } = getTableParamsFromSearchParams(searchParams);
  const { agentStatusType } = getAgentsFiltersFromSearchParams(searchParams);

  const { data: agentsData, isLoading: isAgentsLoading } =
    api.agents.getAllAgents.useQuery({
      page,
      userId: session?.user.id,
      agentStatusType,
    });
  const [agentsCount, agents] = agentsData?.data ?? [];

  const rows = agents?.map((agent) => {
    const isUser = agent.user.id === session?.user.id;

    return {
      id: agent.id,
      name: `${agent.firstName} ${agent.lastName} ${isUser ? "(me)" : ""}`,
      agentType: agentTypeDict[agent.type],
      email: agent.user.email,
      actions: isUser ? (
        "—"
      ) : (
        <AgentActions
          agentId={agent.id}
          status={agent.personalStatus[0]?.status ?? "NONE"}
        />
      ),
    };
  });

  const columns = [
    {
      field: "name",
      headerName: "Agent name",
      width: 220,
    },
    { field: "agentType", headerName: "Agency", width: 220 },
    { field: "email", headerName: "Email", width: 280 },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderCell: (params: GridRenderCellParams<any, JSX.Element>) => (
        <>{params.value}</>
      ),
    },
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
    <div className="relative mb-16">
      <Box sx={{ height: 650, width: "100%" }}>
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
