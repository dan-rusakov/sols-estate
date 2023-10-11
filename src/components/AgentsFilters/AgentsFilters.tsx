import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { $Enums } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { getAgentsFiltersFromSearchParams } from "./utils";
import { createSearchParamsString } from "~/utils/url";
import { AgentsParamsKey } from "../AgentsTable/utils";
import { TableParamsName } from "~/utils/table";

export default function AgentsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { agentStatusType } = getAgentsFiltersFromSearchParams(searchParams);
  const [selectedAgentType, setSelectedAgentType] = useState<
    keyof typeof $Enums.AgentPersonalStatusType
  >(agentStatusType ?? "NONE");

  const changeVisibleAgents = (
    _evt: unknown,
    agentType: $Enums.AgentPersonalStatusType,
  ) => {
    setSelectedAgentType(agentType);
    void router.push(
      pathname +
        "?" +
        createSearchParamsString(searchParams, [
          {
            name: AgentsParamsKey.agentStatusType,
            value: agentType,
          },
          { name: TableParamsName.page, value: 0 },
        ]),
    );
  };

  return (
    <div className="flex w-full flex-row gap-8">
      <ToggleButtonGroup
        color="primary"
        value={selectedAgentType}
        exclusive
        onChange={changeVisibleAgents}
        aria-label="Platform"
      >
        <ToggleButton value={$Enums.AgentPersonalStatusType.NONE}>
          All agents
        </ToggleButton>
        <ToggleButton value={$Enums.AgentPersonalStatusType.FAVOURITE}>
          Favourites
        </ToggleButton>
        <ToggleButton value={$Enums.AgentPersonalStatusType.BLOCKED}>
          Blocked
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
