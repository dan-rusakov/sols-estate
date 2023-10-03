import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createDeclarationSchema, findAllDeclarationsSchema } from "../schema/declarations";
import { findAllDeclarationsHandler, createDeclarationHandler } from "../controllers/declarations";


export const declarationsRouter = createTRPCRouter({
  getAllDeclarations: publicProcedure.input(findAllDeclarationsSchema).query(({ ctx, input }) => findAllDeclarationsHandler(ctx, input)),
  addDeclaraion: protectedProcedure.input(createDeclarationSchema).mutation(({ ctx, input }) => createDeclarationHandler(ctx, input)),
});
