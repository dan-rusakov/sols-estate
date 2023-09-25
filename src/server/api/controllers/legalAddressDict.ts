import { Prisma } from "@prisma/client";
import { type InnerTRPCContext } from "../trpc";
import { findAllCities, findAllDistricts, findAllRegions } from "../services/legalAddressDict";

export const findAllRegionsArgs = Prisma.validator<Prisma.LegalAddressRegionDictDefaultArgs>()({
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
}

export const findAllCitiesArgs = Prisma.validator<Prisma.LegalAddressCityDictDefaultArgs>()({
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
}

export const findAllDistrictsArgs = Prisma.validator<Prisma.LegalAddressDistrictDictDefaultArgs>()({
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
}