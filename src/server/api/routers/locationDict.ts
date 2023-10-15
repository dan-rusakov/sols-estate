import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { findAllApartmentLocationsHandler, findAllCitiesHandler, findAllDistrictsHandler, findAllRegionsHandler, findAllVillaLocationsHandler } from "../controllers/locationDict";

export const locationDictRouter = createTRPCRouter({
    getAllDistricts: publicProcedure.query(({ ctx }) => findAllDistrictsHandler(ctx)),
    getAllCities: publicProcedure.query(({ ctx }) => findAllCitiesHandler(ctx)),
    getAllRegions: publicProcedure.query(({ ctx }) => findAllRegionsHandler(ctx)),
    getAllVillaLocations: publicProcedure.query(({ ctx }) => findAllVillaLocationsHandler(ctx)),
    getAllApartmentLocations: publicProcedure.query(({ ctx }) => findAllApartmentLocationsHandler(ctx)),
});
