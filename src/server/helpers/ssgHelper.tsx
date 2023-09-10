import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "../api/root";
import { createInnerTRPCContext } from "../api/trpc";

export const generateSSGHelper = () => {
  return createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({
      session: null,
    }),
    transformer: superjson, // optional - adds superjson serialization
  });
};
