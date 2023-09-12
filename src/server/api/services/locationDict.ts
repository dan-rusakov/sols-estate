import { type InnerTRPCContext } from "../trpc";
import { type findAllDistrictsArgs } from '../controllers/locationDict';

export const findAllDistricts = async (ctx: InnerTRPCContext, select: typeof findAllDistrictsArgs.select) => {
    return ctx.prisma.locationDistrictDict.findMany({
        select,
    });
}