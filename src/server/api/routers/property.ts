import {
    createTRPCRouter,
    publicProcedure,
} from "~/server/api/trpc";
import { findAllComplexesHandler, findAllPropertyTypeHandler } from "../controllers/property";

export const propertyRouter = createTRPCRouter({
    getAllPropertyType: publicProcedure.query(({ ctx }) => findAllPropertyTypeHandler(ctx)),
    getAllComplexes: publicProcedure.query(({ ctx }) => findAllComplexesHandler(ctx)),
});
