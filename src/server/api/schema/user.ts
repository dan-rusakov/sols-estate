import { type TypeOf, object, z } from "zod";

export const updateUserEmailSchema = object({
    userId: z.string(),
    email: z.string(),
});
export type updateUserEmailInput = TypeOf<typeof updateUserEmailSchema>;