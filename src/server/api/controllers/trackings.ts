import { Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";
import { type findAllTrackingsInput } from "../schema/trackings";
import { findAllTrackings } from "../services/trackings";

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