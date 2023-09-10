import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";

export const locationDictRouter = createTRPCRouter({
    getAllDistricts: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.locationDistrictDict.findMany({
            select: {
                name: true,
                slug: true,
            }
        });
    })
});
