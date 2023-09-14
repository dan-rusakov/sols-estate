import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { declarationsRouter } from "./routers/declarations";
import { locationDictRouter } from "./routers/locationDict";
import { agentsRouter } from "./routers/agents";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  declarations: declarationsRouter,
  locationDict: locationDictRouter,
  agents: agentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
