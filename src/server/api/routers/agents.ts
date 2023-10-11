import { addAgentToBlacklistHandler, addAgentToFavouritesHandler, createAgentHandler, findAgentHandler, findAllAgentsHandler, removeAgentFromBlacklistHandler, removeAgentFromFavouritesHandler, updateAgentHandler } from "../controllers/agents";
import { addAgentToBlacklistSchema, addAgentToFavouritesSchema, createAgentSchema, findAgentSchema, findAllAgentsSchema, removeAgentFromBlacklistSchema, removeAgentFromFavouritesSchema, updateAgentSchema } from "../schema/agents";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const agentsRouter = createTRPCRouter({
    getAllAgents: publicProcedure.input(findAllAgentsSchema).query(({ ctx, input }) => findAllAgentsHandler(ctx, input)),
    createAgent: protectedProcedure.input(createAgentSchema).mutation(({ ctx, input }) => createAgentHandler(ctx, input)),
    getAgent: publicProcedure.input(findAgentSchema).query(({ ctx, input }) => findAgentHandler(ctx, input)),
    changeAgent: protectedProcedure.input(updateAgentSchema).mutation(({ ctx, input }) => updateAgentHandler(ctx, input)),
    addAgentToFavourites: protectedProcedure.input(addAgentToFavouritesSchema).mutation(({ ctx, input }) => addAgentToFavouritesHandler(ctx, input)),
    removeAgentFromFavourites: protectedProcedure.input(removeAgentFromFavouritesSchema).mutation(({ ctx, input }) => removeAgentFromFavouritesHandler(ctx, input)),
    addAgentToBlacklist: protectedProcedure.input(addAgentToBlacklistSchema).mutation(({ ctx, input }) => addAgentToBlacklistHandler(ctx, input)),
    removeAgentFromBlacklist: protectedProcedure.input(removeAgentFromBlacklistSchema).mutation(({ ctx, input }) => removeAgentFromBlacklistHandler(ctx, input)),
});
