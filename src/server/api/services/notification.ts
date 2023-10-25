import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";

export const createVerificationToken = async (ctx: InnerTRPCContext, data: Prisma.NotificationVerificationTokenCreateArgs['data']) => {
    return ctx.prisma.notificationVerificationToken.create({
        data,
    });
}

export const findVerificationToken = async (ctx: InnerTRPCContext, where: Prisma.NotificationVerificationTokenFindUniqueArgs['where']) => {
    return ctx.prisma.notificationVerificationToken.findUnique({
        where,
    });
}

export const createNotificationInfo = async (ctx: InnerTRPCContext, data: Prisma.NotificationInfoCreateArgs['data']) => {
    return ctx.prisma.notificationInfo.create({
        data,
    });
}