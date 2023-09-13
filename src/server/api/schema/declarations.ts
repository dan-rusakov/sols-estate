import { type TypeOf, object, z } from "zod";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";
import { TableParamsName } from "~/utils/table";

export const findAllDeclarationsSchema = object({
    [DeclarationsParamsKey.location]: z.array(z.string()).or(z.null()),
    [TableParamsName.page]: z.number().or(z.null()),
    [DeclarationsParamsKey.priceMin]: z.number().or(z.null()),
    [DeclarationsParamsKey.priceMax]: z.number().or(z.null()),
    [DeclarationsParamsKey.roomsMin]: z.number().or(z.null()),
    [DeclarationsParamsKey.roomsMax]: z.number().or(z.null()),
});

export type findAllDeclarationsInput = TypeOf<typeof findAllDeclarationsSchema>;