import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { findAllCitiesHandler, findAllDistrictsHandler, findAllRegionsHandler } from "../controllers/legalAddressDict";

export const legalAddressDictRouter = createTRPCRouter({
    getAllRegions: publicProcedure.query(({ ctx }) => findAllRegionsHandler(ctx)),
    getAllCities: publicProcedure.query(({ ctx }) => findAllCitiesHandler(ctx)),
    getAllDistricts: publicProcedure.query(({ ctx }) => findAllDistrictsHandler(ctx)),
});
