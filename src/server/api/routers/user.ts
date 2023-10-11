import { findUserHandler, updateUserEmailHandler } from "../controllers/user";
import { findUserSchema, updateUserEmailSchema } from "../schema/user";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    changeUserEmail: protectedProcedure.input(updateUserEmailSchema).mutation(({ ctx, input }) => updateUserEmailHandler(ctx, input)),
    getUser: publicProcedure.input(findUserSchema).query(({ ctx, input }) => findUserHandler(ctx, input)),
});
