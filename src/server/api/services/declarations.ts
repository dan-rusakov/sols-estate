import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";

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