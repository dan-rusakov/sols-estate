import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";

export const updateUserEmail = async (ctx: InnerTRPCContext, where: Prisma.UserWhereUniqueInput, data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>) => {
    return ctx.prisma.user.update({
        where,
        data
    });
}

export const findUser = async (ctx: InnerTRPCContext, where: Prisma.UserWhereUniqueInput) => {
    return ctx.prisma.user.findUnique({
        where,
    });
}