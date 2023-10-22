import { Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";
import { type deleteTrackingInput, type createTrackingInput, type findAllTrackingsInput } from "../schema/trackings";
import { createTracking, deleteTracking, findAllTrackings } from "../services/trackings";

export const findAllTrackingsHandler = async (ctx: InnerTRPCContext, input: findAllTrackingsInput) => {
    try {
        const trackingsWhere: Prisma.TrackingWhereInput = {
            agent: {
                userId: input.userId,
            }
        };
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
        const createTrackingData: Prisma.TrackingCreateArgs['data'] = {
            propertyType: input.propertyType,
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
            location: {
                create: {
                    district: input.district,
                    city: input.city,
                    region: input.region,
                    villa: input.villaLocation,
                    apartment: input.apartmentLocation,
                }
            }
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