import { Prisma } from "@prisma/client";
import { createDeclaration, deleteDeclaration, findAllDeclarations } from "../services/declarations";
import { type InnerTRPCContext } from "../trpc";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";
import { type deleteDeclaraionInput, type createDeclaraionInput, type findAllDeclarationsInput } from '../schema/declarations';
import { TRPCError } from "@trpc/server";
import { sendNotificationsHandler } from "./notification";
import { excludePropertyTypesListAnyValue, validatePropertyTypeAnyValue } from "~/utils/entities";

export const findAllDeclarationsArgs = Prisma.validator<Prisma.DeclarationDefaultArgs>()({
    select: {
        id: true,
        location: {
            select: {
                district: true,
                villa: true,
                apartment: true,
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
                OR: [
                    {
                        propertyType: {
                            in: excludePropertyTypesListAnyValue(propertyType),
                        }
                    },
                    propertyType.includes('any') ? {
                        propertyType: null,
                    } : {}
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

        const declarations = await findAllDeclarations(ctx, filtering, findAllDeclarationsArgs.select, input.page, input.take);

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
        const createDeclarationData: Prisma.DeclarationCreateArgs['data'] = {
            propertyType: {
                connect: validatePropertyTypeAnyValue(input.propertyTypeSlug).map(property => ({
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

        await createDeclaration(ctx, createDeclarationData);
        // void sendNotificationsHandler(ctx, {
        //     userId: input.userId,
        //     district: input.district,
        //     city: input.city,
        //     region: input.region,
        //     propertyType: input.propertyType,
        //     villaLocation: input.villaLocation,
        //     apartmentLocation: input.apartmentLocation,
        //     priceMin: input.priceMin,
        //     priceMax: input.priceMax,
        //     roomsMin: input.roomsMin,
        //     roomsMax: input.roomsMax,
        //     checkinDate: input.checkinDate,
        //     checkoutDate: input.checkoutDate,
        //     commission: input.commission,
        // });

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