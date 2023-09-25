import { type InnerTRPCContext } from "../trpc";
import { type findAllDistrictsArgs, type findAllCitiesArgs, type findAllRegionsArgs } from "../controllers/legalAddressDict";

export const findAllRegions = async (ctx: InnerTRPCContext, select: typeof findAllRegionsArgs.select) => {
    return ctx.prisma.legalAddressRegionDict.findMany({
        select,
    });
}

export const findAllCities = async (ctx: InnerTRPCContext, select: typeof findAllCitiesArgs.select) => {
    return ctx.prisma.legalAddressCityDict.findMany({
        select,
    });
}

export const findAllDistricts = async (ctx: InnerTRPCContext, select: typeof findAllDistrictsArgs.select) => {
    return ctx.prisma.legalAddressDistrictDict.findMany({
        select,
    });
}