import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { type Prisma } from '@prisma/client';
import { FiltersName } from "~/components/DeclarationsFilters/DeclarationsFilters.types";


export const declarationsRouter = createTRPCRouter({
  getAllDeclarations: publicProcedure.input(z.object({ [FiltersName.location]: z.string() })).query(({ ctx, input }) => {

    const filtering: Prisma.DeclarationWhereInput = {};

    if (input[FiltersName.location]) {
      filtering.location = {
        district: {
          equals: input[FiltersName.location],
        }
      }
    }

    return ctx.prisma.declaration.findMany({
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
      }
    });
  })
});
