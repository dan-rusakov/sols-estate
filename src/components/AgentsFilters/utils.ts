import { $Enums } from "@prisma/client";
import { getStringsArrayFromUrl } from "~/utils/url";
import { AgentsParamsKey } from "../AgentsTable/utils";

export const getAgentStatusTypeFromUrl = (value: string | string[] | undefined): (keyof typeof $Enums.AgentPersonalStatusType) | null => {
    const stringsArrayFromUrl = getStringsArrayFromUrl(value);

    if (Object.keys($Enums.AgentPersonalStatusType).includes(stringsArrayFromUrl?.[0] ?? '')) {
        return stringsArrayFromUrl![0] as (keyof typeof $Enums.AgentPersonalStatusType);
    }

    return null;
};

export const getAgentsFiltersFromSearchParams = (
    searchParams: URLSearchParams,
) => {
    return {
        [AgentsParamsKey.agentStatusType]: getAgentStatusTypeFromUrl(
            searchParams.getAll(AgentsParamsKey.agentStatusType),
        ),
    };
};