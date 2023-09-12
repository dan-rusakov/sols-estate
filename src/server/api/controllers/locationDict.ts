import { Prisma } from "@prisma/client";
import { findAllDistricts } from "../services/locationDict";
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
}