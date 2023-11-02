import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";

export const findAllDeclarations = async (ctx: InnerTRPCContext, where: Prisma.DeclarationWhereInput, select: Prisma.DeclarationSelect, page: number | null, take?: number) => {
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

export const findDeclaration = async (ctx: InnerTRPCContext, where: Prisma.DeclarationWhereUniqueInput, select: Prisma.DeclarationSelect) => {
    return ctx.prisma.declaration.findUnique({
        where,
        select,
    });
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