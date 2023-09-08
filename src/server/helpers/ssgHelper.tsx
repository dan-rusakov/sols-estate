import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "../api/root";
import { prisma } from "~/server/db";
import { getServerAuthSession } from "../auth";
import { type GetServerSidePropsContext } from "next";

export const generateSSGHelper = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });
  return createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, session },
    transformer: superjson, // optional - adds superjson serialization
  });
};
