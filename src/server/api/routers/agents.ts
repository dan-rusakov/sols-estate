import { findAllAgentsHandler } from "../controllers/agents";
import { findAllAgentsSchema } from "../schema/agents";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const agentsRouter = createTRPCRouter({
    getAllAgents: publicProcedure.input(findAllAgentsSchema).query(({ ctx, input }) => findAllAgentsHandler(ctx, input))
});
