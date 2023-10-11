import { $Enums } from "@prisma/client";

export const agentTypeDict: Record<$Enums.AgentType, string> = {
    [$Enums.AgentType.AGENCY]: 'Agency',
    [$Enums.AgentType.PERSONAL]: 'Free agent',
}

export enum AgentsParamsKey {
    agentStatusType = 'agentStatusType',
}