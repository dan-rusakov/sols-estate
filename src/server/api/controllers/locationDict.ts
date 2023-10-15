import { Prisma } from "@prisma/client";
import { findAllApartmentLocations, findAllCities, findAllDistricts, findAllRegions, findAllVillaLocations } from "../services/locationDict";
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

export const findAllVillaLocationsArgs = Prisma.validator<Prisma.LocationVillaDictDefaultArgs>()({
    select: {
        name: true,
        slug: true,
    }
});
export const findAllVillaLocationsHandler = async (ctx: InnerTRPCContext) => {
    try {
        const villaLocations = await findAllVillaLocations(ctx, findAllVillaLocationsArgs.select);

        return {
            status: 'success',
            data: villaLocations,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findAllApartmentLocationsArgs = Prisma.validator<Prisma.LocationApartmentDictDefaultArgs>()({
    select: {
        name: true,
        slug: true,
    }
});
export const findAllApartmentLocationsHandler = async (ctx: InnerTRPCContext) => {
    try {
        const apartmentLocations = await findAllApartmentLocations(ctx, findAllApartmentLocationsArgs.select);

        return {
            status: 'success',
            data: apartmentLocations,
        };
    } catch (err: unknown) {
        throw err;
    }
};