import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { findAllCitiesHandler, findAllDistrictsHandler, findAllRegionsHandler } from "../controllers/locationDict";

export const locationDictRouter = createTRPCRouter({
    getAllDistricts: publicProcedure.query(({ ctx }) => findAllDistrictsHandler(ctx)),
    getAllCities: publicProcedure.query(({ ctx }) => findAllCitiesHandler(ctx)),
    getAllRegions: publicProcedure.query(({ ctx }) => findAllRegionsHandler(ctx)),
});
