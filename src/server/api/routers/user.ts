import { updateUserEmailHandler } from "../controllers/user";
import { updateUserEmailSchema } from "../schema/user";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
    changeUserEmail: protectedProcedure.input(updateUserEmailSchema).mutation(({ ctx, input }) => updateUserEmailHandler(ctx, input)),
});
