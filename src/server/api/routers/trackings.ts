import { findAllTrackingsHandler } from "../controllers/trackings";
import { findAllTrackingsSchema } from "../schema/trackings";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const trackingsRouter = createTRPCRouter({
    getAllTrackings: publicProcedure.input(findAllTrackingsSchema).query(({ ctx, input }) => findAllTrackingsHandler(ctx, input)),
});
