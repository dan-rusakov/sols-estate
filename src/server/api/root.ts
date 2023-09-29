import { createTRPCRouter } from "~/server/api/trpc";
import { declarationsRouter } from "./routers/declarations";
import { locationDictRouter } from "./routers/locationDict";
import { agentsRouter } from "./routers/agents";
import { legalAddressDictRouter } from "./routers/legalAddressDict";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  declarations: declarationsRouter,
  locationDict: locationDictRouter,
  agents: agentsRouter,
  legalAddressDict: legalAddressDictRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
