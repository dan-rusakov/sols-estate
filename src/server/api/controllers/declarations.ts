import { Prisma } from "@prisma/client";
import { findAllDeclarations } from "../services/declarations";
import { type InnerTRPCContext } from "../trpc";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";
import { type findAllDeclarationsInput } from '../schema/declarations';
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

        if (priceMin && priceMax && priceMin > priceMax) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Min price must be less or equal to max price',
            });
        }

        let filtering: Prisma.DeclarationWhereInput = {};

        if (location?.length) {
            filtering.location = {
                district: {
                    in: location,
                }
            }
        }

        if (priceMin !== null || priceMax !== null) {
            filtering = {
                ...filtering,
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
            }
        }

        const declarations = await findAllDeclarations(ctx, filtering, findAllDeclarationsArgs.select, input.page);

        return {
            status: 'success',
            data: declarations,
        };
    } catch (err: unknown) {
        throw err;
    }
}