import { type findAllAgentsArgs } from "../controllers/agents";
import { type InnerTRPCContext } from "../trpc";
import { TAKE_RECORDS_AMOUNT } from "~/utils/table";

export const findAllAgents = async (ctx: InnerTRPCContext, select: typeof findAllAgentsArgs.select, page: number | null) => {
    const skip = TAKE_RECORDS_AMOUNT * (page ?? 0);

    return ctx.prisma.$transaction([
        ctx.prisma.agent.count(),
        ctx.prisma.agent.findMany({
            take: TAKE_RECORDS_AMOUNT,
            select,
            skip,
            orderBy: [{ createdAt: "desc" }],
        }),
    ])
}