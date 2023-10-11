import { Prisma } from "@prisma/client";
import { addAgentToBlacklist, addAgentToFavourites, createAgent, findAgent, findAllAgents, removeAgentFromBlacklist, removeAgentFromFavourites, updateAgent } from "../services/agents";
import { type InnerTRPCContext } from "../trpc";
import { type findAgentInput, type createAgentInput, type findAllAgentsInput, type updateAgentInput, type addAgentToFavouritesInput, type removeAgentFromFavouritesInput, type addAgentToBlacklistInput } from "../schema/agents";
import { TRPCError } from "@trpc/server";
import { updateUser } from "../services/users";
import { AgentsParamsKey } from "~/components/AgentsTable/utils";

export const findAllAgentsHandler = async (ctx: InnerTRPCContext, input: findAllAgentsInput) => {
    try {
        const agentStatusType = input[AgentsParamsKey.agentStatusType];

        const findAgentWhere: Prisma.AgentWhereUniqueInput = {
            userId: input.userId,
        }

        const userAgent = await findAgent(ctx, findAgentWhere, findAgentArgs.select);

        interface BaseFiltering {
            AND: Prisma.AgentWhereInput[],
        }
        const filtering: BaseFiltering = {
            AND: []
        };

        if (agentStatusType && agentStatusType !== 'NONE') {
            filtering.AND.push({
                personalStatus: {
                    some: {
                        initiatorId: userAgent?.id,
                        status: agentStatusType,
                    }
                }
            })
        }

        const findAllAgentsArgs = Prisma.validator<Prisma.AgentDefaultArgs>()({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                type: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                    }
                },
                personalStatus: {
                    select: {
                        status: true,
                        initiator: {
                            select: {
                                id: true,
                            }
                        }
                    },
                    where: {
                        initiatorId: userAgent?.id,
                    }
                }
            }
        });

        const agentsData = await findAllAgents(ctx, filtering, findAllAgentsArgs.select, input.page);

        return {
            status: 'success',
            data: agentsData,
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

export const findAgentArgs = Prisma.validator<Prisma.AgentDefaultArgs>()({
    select: {
        id: true,
        firstName: true,
        lastName: true,
        type: true,
        user: {
            select: {
                email: true,
            },
        },
        contactInfo: {
            select: {
                telegramLink: true,
                whatsappLink: true,
                viberLink: true,
                lineLink: true,
            }
        },
    }
});
export const findAgentHandler = async (ctx: InnerTRPCContext, input: findAgentInput) => {

    const fintAgentWhere: Prisma.AgentWhereUniqueInput = {
        userId: input.agentId,
    }

    try {
        const agent = await findAgent(ctx, fintAgentWhere, findAgentArgs.select);

        return {
            status: 'success',
            data: agent,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const updateAgentHandler = async (ctx: InnerTRPCContext, input: updateAgentInput) => {
    try {
        const fintAgentWhere: Prisma.AgentWhereUniqueInput = {
            userId: input.agentId,
        }
        const updateAgentData: Prisma.XOR<Prisma.AgentUpdateInput, Prisma.AgentUncheckedUpdateInput> = {
            contactInfo: {
                update: {
                    telegramLink: input.telegramLink,
                    whatsappLink: input.whatsappLink,
                    viberLink: input.viberLink,
                    lineLink: input.lineLink,
                }
            }
        };

        const agent = await updateAgent(ctx, fintAgentWhere, updateAgentData);

        return {
            status: 'success',
            data: agent,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const addAgentToFavouritesHandler = async (ctx: InnerTRPCContext, input: addAgentToFavouritesInput) => {
    try {
        const findUserAgentWhere: Prisma.AgentWhereUniqueInput = {
            userId: input.userId,
        }
        const userAgent = await findAgent(ctx, findUserAgentWhere, findAgentArgs.select);

        if (!userAgent) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Couldn`t find user agent',
            });
        }

        const findAgentStatusWhere: Prisma.AgentPersonalStatusWhereUniqueInput = {
            initiatorId_effectorId: {
                initiatorId: userAgent.id,
                effectorId: input.agentId
            },
        }
        const createAgentStatusData: Prisma.XOR<Prisma.AgentPersonalStatusCreateInput, Prisma.AgentPersonalStatusUncheckedCreateInput> = {
            status: 'FAVOURITE',
            initiator: {
                connect: {
                    id: userAgent.id,
                }
            },
            effector: {
                connect: {
                    id: input.agentId
                }
            }
        };
        const updateAgentStatusData: Prisma.XOR<Prisma.AgentPersonalStatusUpdateInput, Prisma.AgentPersonalStatusUncheckedUpdateInput> = {
            status: 'FAVOURITE',
        };

        await addAgentToFavourites(ctx, findAgentStatusWhere, createAgentStatusData, updateAgentStatusData);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const removeAgentFromFavouritesHandler = async (ctx: InnerTRPCContext, input: removeAgentFromFavouritesInput) => {
    try {
        const findUserAgentWhere: Prisma.AgentWhereUniqueInput = {
            userId: input.userId,
        }
        const userAgent = await findAgent(ctx, findUserAgentWhere, findAgentArgs.select);

        if (!userAgent) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Couldn`t find user agent',
            });
        }

        const findAgentStatusWhere: Prisma.AgentPersonalStatusWhereUniqueInput = {
            initiatorId_effectorId: {
                initiatorId: userAgent.id,
                effectorId: input.agentId
            },
        }

        await removeAgentFromFavourites(ctx, findAgentStatusWhere);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const addAgentToBlacklistHandler = async (ctx: InnerTRPCContext, input: addAgentToBlacklistInput) => {
    try {
        const findUserAgentWhere: Prisma.AgentWhereUniqueInput = {
            userId: input.userId,
        }
        const userAgent = await findAgent(ctx, findUserAgentWhere, findAgentArgs.select);

        if (!userAgent) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Couldn`t find user agent',
            });
        }

        const findAgentStatusWhere: Prisma.AgentPersonalStatusWhereUniqueInput = {
            initiatorId_effectorId: {
                initiatorId: userAgent.id,
                effectorId: input.agentId
            },
        }
        const createAgentStatusData: Prisma.XOR<Prisma.AgentPersonalStatusCreateInput, Prisma.AgentPersonalStatusUncheckedCreateInput> = {
            status: 'BLOCKED',
            initiator: {
                connect: {
                    id: userAgent.id,
                }
            },
            effector: {
                connect: {
                    id: input.agentId
                }
            }
        };
        const updateAgentStatusData: Prisma.XOR<Prisma.AgentPersonalStatusUpdateInput, Prisma.AgentPersonalStatusUncheckedUpdateInput> = {
            status: 'BLOCKED',
        };

        await addAgentToBlacklist(ctx, findAgentStatusWhere, createAgentStatusData, updateAgentStatusData);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const removeAgentFromBlacklistHandler = async (ctx: InnerTRPCContext, input: removeAgentFromFavouritesInput) => {
    try {
        const findUserAgentWhere: Prisma.AgentWhereUniqueInput = {
            userId: input.userId,
        }
        const userAgent = await findAgent(ctx, findUserAgentWhere, findAgentArgs.select);

        if (!userAgent) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Couldn`t find user agent',
            });
        }

        const findAgentStatusWhere: Prisma.AgentPersonalStatusWhereUniqueInput = {
            initiatorId_effectorId: {
                initiatorId: userAgent.id,
                effectorId: input.agentId
            },
        }

        await removeAgentFromBlacklist(ctx, findAgentStatusWhere);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};