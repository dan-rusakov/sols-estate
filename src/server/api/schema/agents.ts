import { $Enums } from "@prisma/client";
import { type TypeOf, object, z } from "zod";
import { AgentsParamsKey } from "~/components/AgentsTable/utils";
import { TableParamsName } from "~/utils/table";

export const findAllAgentsSchema = object({
    'userId': z.string().or(z.undefined()),
    agentIds: z.array(z.string()).or(z.undefined()),
    [TableParamsName.page]: z.number().or(z.null()),
    [AgentsParamsKey.agentStatusType]: z.enum([$Enums.AgentPersonalStatusType.BLOCKED, $Enums.AgentPersonalStatusType.FAVOURITE, $Enums.AgentPersonalStatusType.NONE]).or(z.null()),
});
export type findAllAgentsInput = TypeOf<typeof findAllAgentsSchema>;

export const createAgentSchema = object({
    'userId': z.string(),
    'firstName': z.string(),
    'lastName': z.string(),
    'type': z.enum([$Enums.AgentType.AGENCY, $Enums.AgentType.PERSONAL]),
    'agencyName': z.string().or(z.null()),
    'district': z.string(),
    'city': z.string(),
    'region': z.string(),
    'telegramLink': z.string().or(z.null()),
    'whatsappLink': z.string().or(z.null()),
    'viberLink': z.string().or(z.null()),
    'lineLink': z.string().or(z.null()),
});
export type createAgentInput = TypeOf<typeof createAgentSchema>;

export const findAgentSchema = object({
    'agentId': z.string(),
});
export type findAgentInput = TypeOf<typeof findAgentSchema>;

export const updateAgentSchema = object({
    'agentId': z.string(),
    'telegramLink': z.string().or(z.null()),
    'whatsappLink': z.string().or(z.null()),
    'viberLink': z.string().or(z.null()),
    'lineLink': z.string().or(z.null()),
});
export type updateAgentInput = TypeOf<typeof updateAgentSchema>;

export const addAgentToFavouritesSchema = object({
    'userId': z.string(),
    'agentId': z.string(),
});
export type addAgentToFavouritesInput = TypeOf<typeof addAgentToFavouritesSchema>;

export const removeAgentFromFavouritesSchema = object({
    'userId': z.string(),
    'agentId': z.string(),
});
export type removeAgentFromFavouritesInput = TypeOf<typeof removeAgentFromFavouritesSchema>;

export const addAgentToBlacklistSchema = object({
    'userId': z.string(),
    'agentId': z.string(),
});
export type addAgentToBlacklistInput = TypeOf<typeof addAgentToBlacklistSchema>;

export const removeAgentFromBlacklistSchema = object({
    'userId': z.string(),
    'agentId': z.string(),
});
export type removeAgentFromBlacklistInput = TypeOf<typeof removeAgentFromBlacklistSchema>;