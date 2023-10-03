import { $Enums } from "@prisma/client";
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
    [DeclarationsParamsKey.propertyType]: z.array(z.enum([$Enums.PropertyType.VILLA, $Enums.PropertyType.APARTMENT, $Enums.PropertyType.TOWNHOUSE])).or(z.null()),
});
export type findAllDeclarationsInput = TypeOf<typeof findAllDeclarationsSchema>;

export const createDeclarationSchema = object({
    userId: z.string(),
    district: z.string(),
    city: z.string(),
    region: z.string(),
    propertyType: z.enum([$Enums.PropertyType.VILLA, $Enums.PropertyType.APARTMENT, $Enums.PropertyType.TOWNHOUSE]),
    priceMin: z.number().or(z.null()),
    priceMax: z.number().or(z.null()),
    checkinDate: z.string().or(z.null()),
    checkoutDate: z.string().or(z.null()),
    roomsMin: z.number().or(z.null()),
    roomsMax: z.number().or(z.null()),
    commission: z.number(),
});
export type createDeclaraionInput = TypeOf<typeof createDeclarationSchema>;