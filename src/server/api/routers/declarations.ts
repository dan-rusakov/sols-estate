import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type Prisma } from '@prisma/client';
import { TAKE_RECORDS_AMOUNT } from "~/utils/table";
import { DeclarationsParamsKey } from "~/components/DeclarationsTable/utils";


export const declarationsRouter = createTRPCRouter({
  getAllDeclarations: publicProcedure.input(z.object({ [DeclarationsParamsKey.location]: z.array(z.string()), page: z.number() })).query(({ ctx, input }) => {
    const skip = TAKE_RECORDS_AMOUNT * input.page;

    const filtering: Prisma.DeclarationWhereInput = {};

    if (input[DeclarationsParamsKey.location].length) {
      filtering.location = {
        district: {
          in: input[DeclarationsParamsKey.location],
        }
      }
    }

    return ctx.prisma.$transaction([
      ctx.prisma.declaration.count({
        where: filtering,
      }),
      ctx.prisma.declaration.findMany({
        where: filtering,
        select: {
          id: true,
          location: {
            select: {
              district: true,
            }
          },
          propertyType: true,
          priceMin: true,
          priceMax: true,
          checkinDate: true,
          checkoutDate: true,
          roomsMin: true,
          roomsMax: true,
          agent: {
            select: {
              firstName: true,
              lastName: true,
              contactInfo: {
                select: {
                  telegramLink: true,
                  whatsappLink: true,
                  viberLink: true,
                }
              }
            }
          },
          commission: true,
        },
        take: TAKE_RECORDS_AMOUNT,
        skip,
      }),
    ])
  })
});
