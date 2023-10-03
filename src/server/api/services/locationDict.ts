import { type InnerTRPCContext } from "../trpc";
import { type findAllRegionsArgs, type findAllCitiesArgs, type findAllDistrictsArgs } from '../controllers/locationDict';

export const findAllDistricts = async (ctx: InnerTRPCContext, select: typeof findAllDistrictsArgs.select) => {
    return ctx.prisma.locationDistrictDict.findMany({
        select,
    });
}

export const findAllCities = async (ctx: InnerTRPCContext, select: typeof findAllCitiesArgs.select) => {
    return ctx.prisma.locationCityDict.findMany({
        select,
    });
}

export const findAllRegions = async (ctx: InnerTRPCContext, select: typeof findAllRegionsArgs.select) => {
    return ctx.prisma.locationRegionDict.findMany({
        select,
    });
}