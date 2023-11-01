import { type TypeOf, object, z } from "zod";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";
import { PropertyTypeAnyValue } from "~/utils/entities";
import { TableParamsName } from "~/utils/table";

export const findAllDeclarationsSchema = object({
    [DeclarationsParamsKey.location]: z.array(z.string()).or(z.null()),
    [TableParamsName.page]: z.number().or(z.null()),
    take: z.number().or(z.undefined()),
    [DeclarationsParamsKey.priceMin]: z.number().or(z.null()),
    [DeclarationsParamsKey.priceMax]: z.number().or(z.null()),
    [DeclarationsParamsKey.roomsMin]: z.number().or(z.null()),
    [DeclarationsParamsKey.roomsMax]: z.number().or(z.null()),
    [DeclarationsParamsKey.propertyType]: z.array(z.enum(['VILLA', 'APARTMENT', 'TOWNHOUSE']).or(z.literal(PropertyTypeAnyValue))).or(z.null()),
    createdAtMax: z.string().or(z.null()),
});
export type findAllDeclarationsInput = TypeOf<typeof findAllDeclarationsSchema>;

export const createDeclarationSchema = object({
    userId: z.string(),
    districtSlug: z.array(z.string()).or(z.null()),
    citySlug: z.array(z.string()),
    regionSlug: z.array(z.string()),
    complexId: z.array(z.string()).or(z.null()),
    propertyTypeSlug: z.array(z.string()),
    priceMin: z.number().or(z.null()),
    priceMax: z.number().or(z.null()),
    checkinDate: z.string().or(z.null()),
    checkoutDate: z.string().or(z.null()),
    roomsMin: z.number().or(z.null()),
    roomsMax: z.number().or(z.null()),
    commission: z.number(),
});
export type createDeclaraionInput = TypeOf<typeof createDeclarationSchema>;

export const deleteDeclarationSchema = object({
    declarationId: z.string(),
});
export type deleteDeclaraionInput = TypeOf<typeof deleteDeclarationSchema>;