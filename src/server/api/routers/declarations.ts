import {
  createTRPCRouter,
  protectedProcedure,
  protectedServerProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createDeclarationSchema, deleteDeclarationSchema, findAllDeclarationsSchema } from "../schema/declarations";
import { findAllDeclarationsHandler, createDeclarationHandler, deleteDeclarationHandler } from "../controllers/declarations";


export const declarationsRouter = createTRPCRouter({
  getAllDeclarations: publicProcedure.input(findAllDeclarationsSchema).query(({ ctx, input }) => findAllDeclarationsHandler(ctx, input)),
  addDeclaraion: protectedProcedure.input(createDeclarationSchema).mutation(({ ctx, input }) => createDeclarationHandler(ctx, input)),
  removeDeclaration: protectedServerProcedure.input(deleteDeclarationSchema).mutation(({ ctx, input }) => deleteDeclarationHandler(ctx, input)),
});
