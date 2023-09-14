import { Prisma } from "@prisma/client";
import { findAllAgents } from "../services/agents";
import { type InnerTRPCContext } from "../trpc";
import { type findAllAgentsInput } from "../schema/agents";

export const findAllAgentsArgs = Prisma.validator<Prisma.AgentDefaultArgs>()({
    select: {
        id: true,
        firstName: true,
        lastName: true,
        type: true,
    }
});

export const findAllAgentsHandler = async (ctx: InnerTRPCContext, input: findAllAgentsInput) => {
    try {
        const agents = await findAllAgents(ctx, findAllAgentsArgs.select, input.page);

        return {
            status: 'success',
            data: agents,
        };
    } catch (err: unknown) {
        throw err;
    }
}