import { type TypeOf, object, z } from "zod";

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
    declarationId: z.string(),
});
export type sendNotificationsInput = TypeOf<typeof sendNotificationsSchema>;