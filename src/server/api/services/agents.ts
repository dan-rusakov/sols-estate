import { type Prisma } from "@prisma/client";
import { type findAgentArgs, type createAgentArgs } from "../controllers/agents";
import { type InnerTRPCContext } from "../trpc";
import { TAKE_RECORDS_AMOUNT } from "~/utils/table";

export const findAllAgents = async (ctx: InnerTRPCContext, where: Prisma.AgentWhereInput, select: Prisma.AgentSelect, page: number | null) => {
    const skip = TAKE_RECORDS_AMOUNT * (page ?? 0);

    return ctx.prisma.$transaction([
        ctx.prisma.agent.count({
            where,
        }),
        ctx.prisma.agent.findMany({
            take: TAKE_RECORDS_AMOUNT,
            select,
            where,
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

export const addAgentToFavourites = async (ctx: InnerTRPCContext, where: Prisma.AgentPersonalStatusWhereUniqueInput, create: Prisma.XOR<Prisma.AgentPersonalStatusCreateInput, Prisma.AgentPersonalStatusUncheckedCreateInput>, update: Prisma.XOR<Prisma.AgentPersonalStatusUpdateInput, Prisma.AgentPersonalStatusUncheckedUpdateInput>) => {
    return ctx.prisma.agentPersonalStatus.upsert({
        where,
        create,
        update,
    });
}

export const removeAgentFromFavourites = async (ctx: InnerTRPCContext, where: Prisma.AgentPersonalStatusWhereUniqueInput) => {
    return ctx.prisma.agentPersonalStatus.delete({
        where,
    });
}

export const addAgentToBlacklist = async (ctx: InnerTRPCContext, where: Prisma.AgentPersonalStatusWhereUniqueInput, create: Prisma.XOR<Prisma.AgentPersonalStatusCreateInput, Prisma.AgentPersonalStatusUncheckedCreateInput>, update: Prisma.XOR<Prisma.AgentPersonalStatusUpdateInput, Prisma.AgentPersonalStatusUncheckedUpdateInput>) => {
    return ctx.prisma.agentPersonalStatus.upsert({
        where,
        create,
        update,
    });
}

export const removeAgentFromBlacklist = async (ctx: InnerTRPCContext, where: Prisma.AgentPersonalStatusWhereUniqueInput) => {
    return ctx.prisma.agentPersonalStatus.delete({
        where,
    });
}