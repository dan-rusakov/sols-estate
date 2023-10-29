import { $Enums } from "@prisma/client";
import { type TypeOf, object, z } from "zod";
import { PropertyTypeAnyValue } from "~/utils/entities";

export const createVerificationTokenSchema = object({
    identifier: z.string(),
    token: z.string(),
});
export type createVerificationTokenInput = TypeOf<typeof createVerificationTokenSchema>;

export const findVerificationTokenSchema = object({
    token: z.string(),
});
export type findVerificationTokenInput = TypeOf<typeof findVerificationTokenSchema>;

export const verifyTokenSchema = object({
    token: z.string(),
    userId: z.string(),
});
export type verifyTokenInput = TypeOf<typeof verifyTokenSchema>;

export const createNotificationInfoSchema = object({
    telegramId: z.string(),
    userId: z.string(),
});
export type createNotificationInfoInput = TypeOf<typeof createNotificationInfoSchema>;

export const sendNotificationsSchema = object({
    userId: z.string(),
    district: z.string(),
    city: z.string(),
    region: z.string(),
    propertyType: z.enum([$Enums.PropertyType.VILLA, $Enums.PropertyType.APARTMENT, $Enums.PropertyType.TOWNHOUSE]).or(z.literal(PropertyTypeAnyValue)),
    villaLocation: z.string().or(z.null()),
    apartmentLocation: z.string().or(z.null()),
    priceMin: z.number().or(z.null()),
    priceMax: z.number().or(z.null()),
    checkinDate: z.string().or(z.null()),
    checkoutDate: z.string().or(z.null()),
    roomsMin: z.number().or(z.null()),
    roomsMax: z.number().or(z.null()),
    commission: z.number(),
});
export type sendNotificationsInput = TypeOf<typeof sendNotificationsSchema>;