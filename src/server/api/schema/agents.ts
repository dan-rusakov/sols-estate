import { $Enums } from "@prisma/client";
import { type TypeOf, object, z } from "zod";
import { TableParamsName } from "~/utils/table";

export const findAllAgentsSchema = object({
    [TableParamsName.page]: z.number().or(z.null()),
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
