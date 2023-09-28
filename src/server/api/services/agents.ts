import { type Prisma } from "@prisma/client";
import { type findAgentArgs, type createAgentArgs, type findAllAgentsArgs } from "../controllers/agents";
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

export const createAgent = async (ctx: InnerTRPCContext, select: typeof createAgentArgs.select, data: Prisma.XOR<Prisma.AgentCreateInput, Prisma.AgentUncheckedCreateInput>) => {
    return ctx.prisma.agent.create({
        select,
        data,
    });
}

export const findAgent = async (ctx: InnerTRPCContext, where: Prisma.AgentWhereUniqueInput, select: typeof findAgentArgs.select,) => {
    return ctx.prisma.agent.findFirst({
        where,
        select,
    });
}

export const updateAgent = async (ctx: InnerTRPCContext, where: Prisma.AgentWhereUniqueInput, data: Prisma.XOR<Prisma.AgentUpdateInput, Prisma.AgentUncheckedUpdateInput>) => {
    return ctx.prisma.agent.update({
        where,
        data
    });
}