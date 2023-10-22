import { createTrackingHandler, deleteTrackingHandler, findAllTrackingsHandler } from "../controllers/trackings";
import { createTrackingSchema, deleteTrackingSchema, findAllTrackingsSchema } from "../schema/trackings";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const trackingsRouter = createTRPCRouter({
    getAllTrackings: publicProcedure.input(findAllTrackingsSchema).query(({ ctx, input }) => findAllTrackingsHandler(ctx, input)),
    addTracking: protectedProcedure.input(createTrackingSchema).mutation(({ ctx, input }) => createTrackingHandler(ctx, input)),
    removeTracking: protectedProcedure.input(deleteTrackingSchema).mutation(({ ctx, input }) => deleteTrackingHandler(ctx, input)),
});
