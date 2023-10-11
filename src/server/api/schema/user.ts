import { type TypeOf, object, z } from "zod";

export const updateUserEmailSchema = object({
    userId: z.string(),
    email: z.string(),
});
export type updateUserEmailInput = TypeOf<typeof updateUserEmailSchema>;

export const findUserSchema = object({
    userId: z.string(),
    agentId: z.string(),
});
export type findUserInput = TypeOf<typeof findUserSchema>;