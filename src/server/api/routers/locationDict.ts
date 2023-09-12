import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { findAllDistrictsHandler } from "../controllers/locationDict";

export const locationDictRouter = createTRPCRouter({
    getAllDistricts: publicProcedure.query(({ ctx }) => findAllDistrictsHandler(ctx))
});
