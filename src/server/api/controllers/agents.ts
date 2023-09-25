import { Prisma } from "@prisma/client";
import { createAgent, findAllAgents } from "../services/agents";
import { type InnerTRPCContext } from "../trpc";
import { type createAgentInput, type findAllAgentsInput } from "../schema/agents";
import { TRPCError } from "@trpc/server";
import { updateUser } from "../services/users";

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
};

export const createAgentArgs = Prisma.validator<Prisma.AgentDefaultArgs>()({
    select: {
        firstName: true,
        lastName: true,
        type: true,
        agencyInfo: {
            select: {
                agencyName: true,
            }
        },
        legalAddress: {
            select: {
                district: true,
                city: true,
                region: true,
            }
        },
        contactInfo: {
            select: {
                telegramLink: true,
                whatsappLink: true,
                viberLink: true,
                lineLink: true,
            }
        }
    }
});
export const createAgentHandler = async (ctx: InnerTRPCContext, input: createAgentInput) => {
    try {
        const createAgentData: Prisma.XOR<Prisma.AgentCreateInput, Prisma.AgentUncheckedCreateInput> = {
            user: {
                connect: {
                    id: input.userId
                }
            },
            firstName: input.firstName,
            lastName: input.lastName,
            type: input.type,
            legalAddress: {
                connectOrCreate: {
                    where: {
                        district_city_region: {
                            district: input.district,
                            city: input.city,
                            region: input.region,
                        }
                    },
                    create: {
                        district: input.district,
                        city: input.city,
                        region: input.region,
                    }
                }
            },
            contactInfo: {
                create: {
                    telegramLink: input.telegramLink,
                    whatsappLink: input.whatsappLink,
                    viberLink: input.viberLink,
                    lineLink: input.lineLink,
                }
            }
        };

        if (input.type === 'AGENCY' && !input.agencyName) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Agency name must be provided',
            });
        }

        if (input.agencyName) {
            createAgentData.agencyInfo = {
                connectOrCreate: {
                    where: {
                        agencyName: input.agencyName,
                    },
                    create: {
                        agencyName: input.agencyName,
                    }
                }
            };
        }

        const agent = await createAgent(ctx, createAgentArgs.select, createAgentData);
        await updateUser(ctx, {
            id: input.userId
        }, {
            status: 'ACTIVE',
        });

        return {
            status: 'success',
            data: agent,
        };
    } catch (err: unknown) {
        throw err;
    }
};