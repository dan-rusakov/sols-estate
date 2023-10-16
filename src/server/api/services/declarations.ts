import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";
import { type findAllDeclarationsArgs } from '../controllers/declarations'

export const findAllDeclarations = async (ctx: InnerTRPCContext, where: Prisma.DeclarationWhereInput, select: typeof findAllDeclarationsArgs.select, page: number | null, take?: number) => {
    const skip = (take ?? 0) * (page ?? 0);

    return ctx.prisma.$transaction([
        ctx.prisma.declaration.count({
            where: {
                AND: [
                    where
                ]
            },
        }),
        ctx.prisma.declaration.findMany({
            where: {
                AND: [
                    where
                ]
            },
            select,
            take,
            skip,
            orderBy: [{ createdAt: "desc" }],
        }),
    ])
}

export const createDeclaration = async (ctx: InnerTRPCContext, data: Prisma.XOR<Prisma.DeclarationCreateInput, Prisma.DeclarationUncheckedCreateInput>) => {
    return ctx.prisma.declaration.create({
        data,
    });
}

export const deleteDeclaration = async (ctx: InnerTRPCContext, where: Prisma.DeclarationWhereUniqueInput) => {
    return ctx.prisma.declaration.delete({
        where,
    })
}