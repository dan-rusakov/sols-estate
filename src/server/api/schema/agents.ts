import { type TypeOf, object, z } from "zod";
import { TableParamsName } from "~/utils/table";

export const findAllAgentsSchema = object({
    [TableParamsName.page]: z.number().or(z.null()),
});

export type findAllAgentsInput = TypeOf<typeof findAllAgentsSchema>;