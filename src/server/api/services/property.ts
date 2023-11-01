import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";


export const findAllComplexes = async (ctx: InnerTRPCContext, include: Prisma.ComplexInclude) => {
    return ctx.prisma.complex.findMany({
        include,
    });
}

export const findAllPropertyType = async (ctx: InnerTRPCContext) => {
    return ctx.prisma.propertyType.findMany();
}