import { createNotificationInfoHandler, createVerificationTokenHandler, findVerificationTokenHandler, sendNotificationsHandler, verifyTokenHandler } from "../controllers/notification";
import { createNotificationInfoSchema, createVerificationTokenSchema, findVerificationTokenSchema, sendNotificationsSchema, verifyTokenSchema } from "../schema/notification";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const notificationRouter = createTRPCRouter({
    addVerificationToken: publicProcedure.input(createVerificationTokenSchema).mutation(({ ctx, input }) => createVerificationTokenHandler(ctx, input)),
    getVerificationToken: publicProcedure.input(findVerificationTokenSchema).query(({ ctx, input }) => findVerificationTokenHandler(ctx, input)),
    verifyToken: publicProcedure.input(verifyTokenSchema).mutation(({ ctx, input }) => verifyTokenHandler(ctx, input)),
    addNotificationInfo: publicProcedure.input(createNotificationInfoSchema).mutation(({ ctx, input }) => createNotificationInfoHandler(ctx, input)),
    sendNotifications: publicProcedure.input(sendNotificationsSchema).mutation(({ ctx, input }) => sendNotificationsHandler(ctx, input)),
});