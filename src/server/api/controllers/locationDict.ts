import { findAllCities, findAllDistricts, findAllRegions } from "../services/locationDict";
import { type InnerTRPCContext } from "../trpc";

export const findAllDistrictsHandler = async (ctx: InnerTRPCContext) => {
    try {
        const districts = await findAllDistricts(ctx, {
            name: true,
            slug: true,
        });

        return {
            status: 'success',
            data: districts,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findAllCitiesHandler = async (ctx: InnerTRPCContext) => {
    try {
        const cities = await findAllCities(ctx, {
            name: true,
            slug: true,
        });

        return {
            status: 'success',
            data: cities,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findAllRegionsHandler = async (ctx: InnerTRPCContext) => {
    try {
        const regions = await findAllRegions(ctx, {
            name: true,
            slug: true,
        });

        return {
            status: 'success',
            data: regions,
        };
    } catch (err: unknown) {
        throw err;
    }
};