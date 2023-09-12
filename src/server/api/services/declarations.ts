import { type Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";
import { TAKE_RECORDS_AMOUNT } from "~/utils/table";
import { type findAllDeclarationsArgs } from '../controllers/declarations'

export const findAllDeclarations = async (ctx: InnerTRPCContext, where: Prisma.DeclarationWhereInput, select: typeof findAllDeclarationsArgs.select, page: number | null) => {
    const skip = TAKE_RECORDS_AMOUNT * (page ?? 0);

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
            take: TAKE_RECORDS_AMOUNT,
            skip,
            orderBy: [{ createdAt: "desc" }],
        }),
    ])
}