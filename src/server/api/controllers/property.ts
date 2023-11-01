import { findAllComplexes, findAllPropertyType } from "../services/property";
import { type InnerTRPCContext } from "../trpc";

export const findAllPropertyTypeHandler = async (ctx: InnerTRPCContext) => {
    try {
        const propertyType = await findAllPropertyType(ctx);

        return {
            status: 'success',
            data: propertyType,
        };
    } catch (err: unknown) {
        throw err;
    }
};

export const findAllComplexesHandler = async (ctx: InnerTRPCContext) => {
    try {
        const complexes = await findAllComplexes(ctx, {
            type: true,
        });

        return {
            status: 'success',
            data: complexes,
        };
    } catch (err: unknown) {
        throw err;
    }
};