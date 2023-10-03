import { Prisma } from "@prisma/client";
import { findAllCities, findAllDistricts, findAllRegions } from "../services/locationDict";
import { type InnerTRPCContext } from "../trpc";

export const findAllDistrictsArgs = Prisma.validator<Prisma.LocationDistrictDictDefaultArgs>()({
    select: {
        name: true,
        slug: true,
    }
});
export const findAllDistrictsHandler = async (ctx: InnerTRPCContext) => {
    try {
        const districts = await findAllDistricts(ctx, findAllDistrictsArgs.select);

        return {
            status: 'success',
            data: districts,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findAllCitiesArgs = Prisma.validator<Prisma.LocationCityDictDefaultArgs>()({
    select: {
        name: true,
        slug: true,
    }
});
export const findAllCitiesHandler = async (ctx: InnerTRPCContext) => {
    try {
        const cities = await findAllCities(ctx, findAllCitiesArgs.select);

        return {
            status: 'success',
            data: cities,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findAllRegionsArgs = Prisma.validator<Prisma.LocationRegionDictDefaultArgs>()({
    select: {
        name: true,
        slug: true,
    }
});
export const findAllRegionsHandler = async (ctx: InnerTRPCContext) => {
    try {
        const regions = await findAllRegions(ctx, findAllRegionsArgs.select);

        return {
            status: 'success',
            data: regions,
        };
    } catch (err: unknown) {
        throw err;
    }
};