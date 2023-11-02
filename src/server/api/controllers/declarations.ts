import { type Prisma } from "@prisma/client";
import { createDeclaration, deleteDeclaration, findAllDeclarations, findDeclaration } from "../services/declarations";
import { type InnerTRPCContext } from "../trpc";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";
import { type deleteDeclaraionInput, type createDeclaraionInput, type findAllDeclarationsInput, type findDeclarationInput } from '../schema/declarations';
import { TRPCError } from "@trpc/server";
import { sendNotificationsHandler } from "./notification";
import { excludePropertyTypesListAnyValue, validatePropertyTypeListAnyValue } from "~/utils/entities";

export const findAllDeclarationsHandler = async (ctx: InnerTRPCContext, input: findAllDeclarationsInput) => {
    try {
        const findAllDeclarationsSelect: Prisma.DeclarationSelect = {
            id: true,
            district: true,
            city: true,
            region: true,
            propertyType: true,
            complex: true,
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
                    contactInfo: true,
                }
            },
            commission: true,
        }

        const districtSlug = input.districtSlug;
        const priceMin = input[DeclarationsParamsKey.priceMin];
        const priceMax = input[DeclarationsParamsKey.priceMax];
        const roomsMin = input[DeclarationsParamsKey.roomsMin];
        const roomsMax = input[DeclarationsParamsKey.roomsMax];
        const propertyTypeSlug = input.propertyTypeSlug;

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

        if (districtSlug?.length) {
            filtering.AND.push({
                district: {
                    some: {
                        slug: {
                            in: districtSlug,
                        }
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

        if (propertyTypeSlug?.length === 1 && propertyTypeSlug.includes('any')) {
            filtering.AND.push({
                propertyType: {
                    none: {},
                },
            });
        }

        if (propertyTypeSlug?.length && !propertyTypeSlug.includes('any')) {
            filtering.AND.push({
                propertyType: {
                    some: {
                        slug: {
                            in: excludePropertyTypesListAnyValue(propertyTypeSlug) ?? undefined,
                        }
                    }
                },
            });
        }

        if (propertyTypeSlug?.length && propertyTypeSlug.length > 1 && propertyTypeSlug.includes('any')) {
            filtering.AND.push({
                OR: [
                    {
                        propertyType: {
                            some: {
                                slug: {
                                    in: excludePropertyTypesListAnyValue(propertyTypeSlug) ?? undefined,
                                }
                            }
                        },
                    }, {
                        propertyType: {
                            none: {},
                        },
                    }
                ]
            });
        }

        if (input.createdAtMax !== null) {
            filtering.AND.push({
                createdAt: {
                    lte: input.createdAtMax,
                }
            })
        }

        const declarations = await findAllDeclarations(ctx, filtering, findAllDeclarationsSelect, input.page, input.take);

        return {
            status: 'success',
            data: declarations,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findDeclarationHandler = async (ctx: InnerTRPCContext, input: findDeclarationInput) => {
    try {
        const findAllDeclarationsSelect: Prisma.DeclarationSelect = {
            id: true,
            district: true,
            city: true,
            region: true,
            propertyType: true,
            complex: true,
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
                    contactInfo: true,
                }
            },
            commission: true,
        };
        const declaration = await findDeclaration(ctx, {
            id: input.declarationId,
        }, findAllDeclarationsSelect);

        return {
            status: 'success',
            data: declaration,
        };
    } catch (err: unknown) {
        throw err;
    }
}

export const createDeclarationHandler = async (ctx: InnerTRPCContext, input: createDeclaraionInput) => {
    try {
        const createDeclarationData: Prisma.DeclarationCreateArgs['data'] = {
            propertyType: {
                connect: validatePropertyTypeListAnyValue(input.propertyTypeSlug).map(property => ({
                    slug: property,
                }))
            },
            district: {
                connect: input.districtSlug?.map(district => ({
                    slug: district,
                }))
            },
            city: {
                connect: input.citySlug.map(city => ({
                    slug: city,
                }))
            },
            region: {
                connect: input.regionSlug.map(region => ({
                    slug: region,
                }))
            },
            complex: {
                connect: input.complexId?.map(complex => ({
                    id: complex,
                }))
            },
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
        };

        const declaration = await createDeclaration(ctx, createDeclarationData);
        await sendNotificationsHandler(ctx, {
            userId: input.userId,
            declarationId: declaration.id,
        });

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
}

export const deleteDeclarationHandler = async (ctx: InnerTRPCContext, input: deleteDeclaraionInput) => {
    try {
        const deleteDeclarationWhere: Prisma.DeclarationWhereUniqueInput = {
            id: input.declarationId
        };

        await deleteDeclaration(ctx, deleteDeclarationWhere);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
}