import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const declarationsRouter = createTRPCRouter({
  getAllDeclarations: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.declaration.findMany({
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
