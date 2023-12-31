import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";

export const findAllTrackings = async (ctx: InnerTRPCContext, where: Prisma.TrackingWhereInput, select: Prisma.TrackingSelect) => {
    return ctx.prisma.$transaction([
        ctx.prisma.tracking.count({
            where: {
                AND: [
                    where
                ]
            },
        }),
        ctx.prisma.tracking.findMany({
            where: {
                AND: [
                    where
                ]
            },
            select,
            orderBy: [{ createdAt: "desc" }],
        }),
    ])
}

export const createTracking = async (ctx: InnerTRPCContext, data: Prisma.TrackingCreateArgs['data']) => {
    return ctx.prisma.tracking.create({
        data,
    });
}

export const deleteTracking = async (ctx: InnerTRPCContext, where: Prisma.TrackingDeleteArgs['where']) => {
    return ctx.prisma.tracking.delete({
        where,
    });
}