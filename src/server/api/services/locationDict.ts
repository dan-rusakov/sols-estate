import { type InnerTRPCContext } from "../trpc";
import { type Prisma } from "@prisma/client";

export const findAllDistricts = async (ctx: InnerTRPCContext, select: Prisma.LocationDistrictSelect) => {
    return ctx.prisma.locationDistrict.findMany({
        select,
    });
}

export const findAllCities = async (ctx: InnerTRPCContext, select: Prisma.LocationCitySelect) => {
    return ctx.prisma.locationCity.findMany({
        select,
    });
}

export const findAllRegions = async (ctx: InnerTRPCContext, select: Prisma.LocationRegionSelect) => {
    return ctx.prisma.locationRegion.findMany({
        select,
    });
}