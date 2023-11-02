import { Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";
import { type deleteTrackingInput, type createTrackingInput, type findAllTrackingsInput } from "../schema/trackings";
import { createTracking, deleteTracking, findAllTrackings } from "../services/trackings";
import { validatePropertyTypeAnyValue } from "~/utils/entities";

export const findAllTrackingsHandler = async (ctx: InnerTRPCContext, input: findAllTrackingsInput) => {
    try {
        interface BaseWhere {
            AND: Prisma.TrackingWhereInput[];
        }
        const trackingsWhere: BaseWhere = {
            AND: [
                {
                    propertyType: input.propertyType,
                    commission: input.commission,
                    agent: {
                        userId: input.userId,
                    },
                    location: {
                        district: input.district,
                        city: input.city,
                        region: input.region,
                        villa: input.villaLocation,
                        apartment: input.apartmentLocation,
                    }
                },
            ],
        };

        if (input.byDeclaration) {
            if (input.priceMin && input.priceMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            priceMin: {
                                lte: input.priceMin,
                            },
                            priceMax: {
                                gte: input.priceMax,
                            }
                        },
                        {
                            priceMin: null,
                            priceMax: {
                                gte: input.priceMax,
                            }
                        },
                        {
                            priceMin: {
                                lte: input.priceMin,
                            },
                            priceMax: null,
                        },
                        {
                            priceMin: null,
                            priceMax: null,
                        }
                    ]

                })
            }

            if (!input.priceMin && input.priceMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            priceMin: null,
                            priceMax: null,
                        },
                        {
                            priceMin: {
                                lte: input.priceMax,
                            },
                            priceMax: {
                                gte: input.priceMax,
                            }
                        },
                        {
                            priceMin: {
                                lte: input.priceMax,
                            },
                            priceMax: null,
                        }
                    ]

                })
            }

            if (input.priceMin && !input.priceMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            priceMin: null,
                            priceMax: null,
                        },
                        {
                            priceMin: {
                                lte: input.priceMin,
                            },
                            priceMax: {
                                gte: input.priceMin,
                            }
                        },
                        {
                            priceMin: null,
                            priceMax: {
                                gte: input.priceMin,
                            }
                        }
                    ]

                })
            }

            if (!input.priceMin && !input.priceMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            priceMin: null,
                            priceMax: null,
                        }
                    ]

                })
            }

            if (input.roomsMin && input.roomsMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            roomsMin: {
                                lte: input.roomsMin,
                            },
                            roomsMax: {
                                gte: input.roomsMax,
                            }
                        },
                        {
                            roomsMin: null,
                            roomsMax: {
                                gte: input.roomsMax,
                            }
                        },
                        {
                            roomsMin: {
                                lte: input.roomsMin,
                            },
                            roomsMax: null,
                        },
                        {
                            roomsMin: null,
                            roomsMax: null,
                        }
                    ]

                })
            }

            if (!input.roomsMin && input.roomsMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            roomsMin: null,
                            roomsMax: null,
                        },
                        {
                            roomsMin: {
                                lte: input.roomsMax,
                            },
                            roomsMax: {
                                gte: input.roomsMax,
                            }
                        },
                        {
                            roomsMin: {
                                lte: input.roomsMax,
                            },
                            roomsMax: null,
                        }
                    ]

                })
            }

            if (input.roomsMin && !input.roomsMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            roomsMin: null,
                            roomsMax: null,
                        },
                        {
                            roomsMin: {
                                lte: input.roomsMin,
                            },
                            roomsMax: {
                                gte: input.roomsMin,
                            }
                        },
                        {
                            roomsMin: null,
                            roomsMax: {
                                gte: input.roomsMin,
                            }
                        }
                    ]

                })
            }

            if (!input.roomsMin && !input.roomsMax) {
                trackingsWhere.AND.push({
                    OR: [
                        {
                            roomsMin: null,
                            roomsMax: null,
                        }
                    ]

                })
            }

        } else {
            trackingsWhere.AND.push({
                propertyType: input.propertyType,
                priceMin: input.priceMin,
                priceMax: input.priceMax,
                roomsMin: input.roomsMin,
                roomsMax: input.roomsMax,
                commission: input.commission,
                agent: {
                    userId: input.userId,
                },
                location: {
                    district: input.district,
                    city: input.city,
                    region: input.region,
                    villa: input.villaLocation,
                    apartment: input.apartmentLocation,
                }
            });
        }

        const findAllTrackingsArgs = Prisma.validator<Prisma.TrackingDefaultArgs>()({
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
                roomsMin: true,
                roomsMax: true,
                commission: true,
                agentId: true,
            }
        });

        const trackings = await findAllTrackings(ctx, trackingsWhere, findAllTrackingsArgs.select);

        return {
            status: 'success',
            data: trackings,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const createTrackingHandler = async (ctx: InnerTRPCContext, input: createTrackingInput) => {
    try {
        const propertyTypeWithoutAny = validatePropertyTypeAnyValue(input.propertyTypeSlug);
        const createTrackingData: Prisma.TrackingCreateArgs['data'] = {
            propertyType: {
                connect: propertyTypeWithoutAny ? {
                    slug: propertyTypeWithoutAny,
                } : undefined,
            },
            district: {
                connect: input.districtSlug ? {
                    slug: input.districtSlug,
                } : undefined
            },
            city: {
                connect: input.citySlug ? {
                    slug: input.citySlug,
                } : undefined
            },
            region: {
                connect: input.regionSlug ? {
                    slug: input.regionSlug,
                } : undefined
            },
            complex: {
                connect: input.complexId ? {
                    id: input.complexId,
                } : undefined
            },
            priceMin: input.priceMin,
            priceMax: input.priceMax,
            roomsMin: input.roomsMin,
            roomsMax: input.roomsMax,
            commission: input.commission,
            agent: {
                connect: {
                    userId: input.userId,
                }
            },
        };

        const tracking = await createTracking(ctx, createTrackingData);

        return {
            status: 'success',
            data: tracking,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const deleteTrackingHandler = async (ctx: InnerTRPCContext, input: deleteTrackingInput) => {
    try {
        const deleteTrackingWhere: Prisma.TrackingDeleteArgs['where'] = {
            id: input.trackingId,
        };

        await deleteTracking(ctx, deleteTrackingWhere);

        return {
            status: 'success',
        };
    } catch (err: unknown) {
        throw err;
    }
};