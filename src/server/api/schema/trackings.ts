import { type TypeOf, object, z } from "zod";

export const findAllTrackingsSchema = object({
    userId: z.string(),
});
export type findAllTrackingsInput = TypeOf<typeof findAllTrackingsSchema>;