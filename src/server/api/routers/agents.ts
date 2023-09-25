import { createAgentHandler, findAllAgentsHandler } from "../controllers/agents";
import { createAgentSchema, findAllAgentsSchema } from "../schema/agents";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const agentsRouter = createTRPCRouter({
    getAllAgents: publicProcedure.input(findAllAgentsSchema).query(({ ctx, input }) => findAllAgentsHandler(ctx, input)),
    createAgent: protectedProcedure.input(createAgentSchema).mutation(({ ctx, input }) => createAgentHandler(ctx, input)),
});
