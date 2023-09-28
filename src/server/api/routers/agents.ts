import { createAgentHandler, findAgentHandler, findAllAgentsHandler, updateAgentHandler } from "../controllers/agents";
import { createAgentSchema, findAgentSchema, findAllAgentsSchema, updateAgentSchema } from "../schema/agents";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const agentsRouter = createTRPCRouter({
    getAllAgents: publicProcedure.input(findAllAgentsSchema).query(({ ctx, input }) => findAllAgentsHandler(ctx, input)),
    createAgent: protectedProcedure.input(createAgentSchema).mutation(({ ctx, input }) => createAgentHandler(ctx, input)),
    getAgent: publicProcedure.input(findAgentSchema).query(({ ctx, input }) => findAgentHandler(ctx, input)),
    changeAgent: protectedProcedure.input(updateAgentSchema).mutation(({ ctx, input }) => updateAgentHandler(ctx, input)),
});
