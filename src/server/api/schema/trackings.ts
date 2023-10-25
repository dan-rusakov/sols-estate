import { $Enums } from "@prisma/client";
import { type TypeOf, object, z } from "zod";

export const findAllTrackingsSchema = object({
    userId: z.string().or(z.undefined()),
    district: z.string().or(z.undefined()),
    city: z.string().or(z.undefined()),
    region: z.string().or(z.undefined()),
    propertyType: z.enum([$Enums.PropertyType.VILLA, $Enums.PropertyType.APARTMENT, $Enums.PropertyType.TOWNHOUSE]).or(z.undefined()),
    villaLocation: z.string().or(z.null()).or(z.undefined()),
    apartmentLocation: z.string().or(z.null()).or(z.undefined()),
    priceMin: z.number().or(z.null()).or(z.undefined()),
    priceMax: z.number().or(z.null()).or(z.undefined()),
    roomsMin: z.number().or(z.null()).or(z.undefined()),
    roomsMax: z.number().or(z.null()).or(z.undefined()),
    commission: z.number().or(z.undefined()),
    byDeclaration: z.boolean().or(z.undefined()),
});
export type findAllTrackingsInput = TypeOf<typeof findAllTrackingsSchema>;

export const createTrackingSchema = object({
    userId: z.string(),
    district: z.string(),
    city: z.string(),
    region: z.string(),
    propertyType: z.enum([$Enums.PropertyType.VILLA, $Enums.PropertyType.APARTMENT, $Enums.PropertyType.TOWNHOUSE]),
    villaLocation: z.string().or(z.null()),
    apartmentLocation: z.string().or(z.null()),
    priceMin: z.number().or(z.null()),
    priceMax: z.number().or(z.null()),
    roomsMin: z.number().or(z.null()),
    roomsMax: z.number().or(z.null()),
    commission: z.number(),
});
export type createTrackingInput = TypeOf<typeof createTrackingSchema>;

export const deleteTrackingSchema = object({
    trackingId: z.string(),
});
export type deleteTrackingInput = TypeOf<typeof deleteTrackingSchema>;