import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { findAllDeclarationsSchema } from "../schema/declarations";
import { findAllDeclarationsHandler } from "../controllers/declarations";


export const declarationsRouter = createTRPCRouter({
  getAllDeclarations: publicProcedure.input(findAllDeclarationsSchema).query(({ ctx, input }) => findAllDeclarationsHandler(ctx, input))
});
