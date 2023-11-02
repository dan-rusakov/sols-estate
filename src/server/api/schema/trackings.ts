import { type TypeOf, object, z } from "zod";

export const findAllTrackingsSchema = object({
    userId: z.string().or(z.undefined()),
    district: z.string().or(z.undefined()),
    city: z.string().or(z.undefined()),
    region: z.string().or(z.undefined()),
    propertyType: z.enum(['VILLA', 'APARTMENT', 'TOWNHOUSE']).or(z.undefined()).or(z.null()),
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
    districtSlug: z.string().or(z.null()),
    citySlug: z.string().or(z.null()),
    regionSlug: z.string().or(z.null()),
    propertyTypeSlug: z.string(),
    complexId: z.string().or(z.null()),
    priceMin: z.number().or(z.null()),
    priceMax: z.number().or(z.null()),
    roomsMin: z.number().or(z.null()),
    roomsMax: z.number().or(z.null()),
    commission: z.number().or(z.null()),
});
export type createTrackingInput = TypeOf<typeof createTrackingSchema>;

export const deleteTrackingSchema = object({
    trackingId: z.string(),
});
export type deleteTrackingInput = TypeOf<typeof deleteTrackingSchema>;