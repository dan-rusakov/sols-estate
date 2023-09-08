import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { declarationsRouter } from "./routers/declarations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  declarations: declarationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
