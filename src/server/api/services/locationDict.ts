import { type InnerTRPCContext } from "../trpc";
import { type findAllRegionsArgs, type findAllCitiesArgs, type findAllDistrictsArgs, type findAllVillaLocationsArgs, type findAllApartmentLocationsArgs } from '../controllers/locationDict';

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

export const findAllVillaLocations = async (ctx: InnerTRPCContext, select: typeof findAllVillaLocationsArgs.select) => {
    return ctx.prisma.locationVillaDict.findMany({
        select,
    });
}

export const findAllApartmentLocations = async (ctx: InnerTRPCContext, select: typeof findAllApartmentLocationsArgs.select) => {
    return ctx.prisma.locationApartmentDict.findMany({
        select,
    });
}