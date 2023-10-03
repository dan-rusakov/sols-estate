import { Prisma } from "@prisma/client";
import { createDeclaration, findAllDeclarations } from "../services/declarations";
import { type InnerTRPCContext } from "../trpc";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";
import { type createDeclaraionInput, type findAllDeclarationsInput } from '../schema/declarations';
import { TRPCError } from "@trpc/server";

export const findAllDeclarationsArgs = Prisma.validator<Prisma.DeclarationDefaultArgs>()({
    select: {
        id: true,
        location: {
            select: {
                district: true,
            }
        },
        propertyType: true,
        priceMin: true,
        priceMax: true,
        checkinDate: true,
        checkoutDate: true,
        roomsMin: true,
        roomsMax: true,
        agent: {
            select: {
                firstName: true,
                lastName: true,
                contactInfo: {
                    select: {
                        telegramLink: true,
                        whatsappLink: true,
                        viberLink: true,
                        lineLink: true,
                    }
                }
            }
        },
        commission: true,
    }
});

export const findAllDeclarationsHandler = async (ctx: InnerTRPCContext, input: findAllDeclarationsInput) => {
    try {
        const location = input[DeclarationsParamsKey.location];
        const priceMin = input[DeclarationsParamsKey.priceMin];
        const priceMax = input[DeclarationsParamsKey.priceMax];
        const roomsMin = input[DeclarationsParamsKey.roomsMin];
        const roomsMax = input[DeclarationsParamsKey.roomsMax];
        const propertyType = input[DeclarationsParamsKey.propertyType];

        if (priceMin && priceMax && priceMin > priceMax) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Min price must be less or equal to max price',
            });
        }

        if (roomsMin && roomsMax && roomsMin > roomsMax) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Min rooms amount must be less or equal to max rooms amount',
            });
        }

        interface BaseFiltering {
            AND: Prisma.DeclarationWhereInput[],
        }
        const filtering: BaseFiltering = {
            AND: []
        };

        if (location?.length) {
            filtering.AND.push({
                location: {
                    district: {
                        in: location,
                    }
                }
            })
        }

        if (priceMin !== null || priceMax !== null) {
            filtering.AND.push({
                OR: [
                    {
                        priceMin: {
                            lte: priceMax ?? undefined,
                            gte: priceMin ?? undefined
                        },
                        priceMax: {
                            equals: null,
                        }
                    },
                    {
                        priceMin: {
                            equals: null,
                        },
                        priceMax: {
                            lte: priceMax ?? undefined,
                            gte: priceMin ?? undefined,
                        }
                    },
                    {
                        priceMin: {
                            lte: priceMax ?? undefined,
                            gte: priceMin ?? undefined,
                        },
                        priceMax: {
                            lte: priceMax ?? undefined,
                            gte: priceMin ?? undefined,
                        }
                    },
                ],
            })
        }

        if (roomsMin !== null || roomsMax !== null) {
            filtering.AND.push({
                OR: [
                    {
                        roomsMin: {
                            lte: roomsMax ?? undefined,
                            gte: roomsMin ?? undefined
                        },
                        roomsMax: {
                            equals: null,
                        }
                    },
                    {
                        roomsMin: {
                            equals: null,
                        },
                        roomsMax: {
                            lte: roomsMax ?? undefined,
                            gte: roomsMin ?? undefined,
                        }
                    },
                    {
                        roomsMin: {
                            lte: roomsMax ?? undefined,
                            gte: roomsMin ?? undefined,
                        },
                        roomsMax: {
                            lte: roomsMax ?? undefined,
                            gte: roomsMin ?? undefined,
                        }
                    },
                ],
            });
        }

        if (propertyType?.length) {
            filtering.AND.push({
                propertyType: {
                    in: propertyType
                }
            })
        }

        const declarations = await findAllDeclarations(ctx, filtering, findAllDeclarationsArgs.select, input.page);

        return {
            status: 'success',
            data: declarations,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const createDeclarationHandler = async (ctx: InnerTRPCContext, input: createDeclaraionInput) => {
    try {
        const createDeclarationData: Prisma.XOR<Prisma.DeclarationCreateInput, Prisma.DeclarationUncheckedCreateInput> = {
            propertyType: input.propertyType,
            priceMin: input.priceMin,
            priceMax: input.priceMax,
            checkinDate: input.checkinDate,
            checkoutDate: input.checkoutDate,
            roomsMin: input.roomsMin,
            roomsMax: input.roomsMax,
            commission: input.commission,
            agent: {
                connect: {
                    userId: input.userId,
                }
            },
            location: {
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
            }
        };

        await createDeclaration(ctx, createDeclarationData);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
}