import { type ParsedUrlQuery } from "querystring";
import { getSingleNumberFromUrl, getStringsArrayFromUrl } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";
import { $Enums } from "@prisma/client";

export const getPropertyTypeFromUrl = (value: string | string[] | undefined): (keyof typeof $Enums.PropertyType)[] | null => {
    const stringsArrayFromUrl = getStringsArrayFromUrl(value);

    if (stringsArrayFromUrl?.every(stringValue => Object.keys($Enums.PropertyType).includes(stringValue))) {
        return stringsArrayFromUrl as (keyof typeof $Enums.PropertyType)[];
    }

    return null;
};

export const getDeclarationsFiltersFromQuery = (
    query: ParsedUrlQuery,
) => {
    return {
        [DeclarationsParamsKey.location]: getStringsArrayFromUrl(
            query[DeclarationsParamsKey.location],
        ),
        [DeclarationsParamsKey.priceMin]: getSingleNumberFromUrl(
            query[DeclarationsParamsKey.priceMin],
        ),
        [DeclarationsParamsKey.priceMax]: getSingleNumberFromUrl(
            query[DeclarationsParamsKey.priceMax],
        ),
        [DeclarationsParamsKey.roomsMin]: getSingleNumberFromUrl(
            query[DeclarationsParamsKey.roomsMin],
        ),
        [DeclarationsParamsKey.roomsMax]: getSingleNumberFromUrl(
            query[DeclarationsParamsKey.roomsMax],
        ),
        [DeclarationsParamsKey.propertyType]: getPropertyTypeFromUrl(
            query[DeclarationsParamsKey.propertyType],
        ),
    };
};

export const getDeclarationsFiltersFromSearchParams = (
    searchParams: URLSearchParams,
) => {
    return {
        [DeclarationsParamsKey.location]: getStringsArrayFromUrl(
            searchParams.getAll(DeclarationsParamsKey.location),
        ),
        [DeclarationsParamsKey.priceMin]: getSingleNumberFromUrl(
            searchParams.getAll(DeclarationsParamsKey.priceMin),
        ),
        [DeclarationsParamsKey.priceMax]: getSingleNumberFromUrl(
            searchParams.getAll(DeclarationsParamsKey.priceMax),
        ),
        [DeclarationsParamsKey.roomsMin]: getSingleNumberFromUrl(
            searchParams.getAll(DeclarationsParamsKey.roomsMin),
        ),
        [DeclarationsParamsKey.roomsMax]: getSingleNumberFromUrl(
            searchParams.getAll(DeclarationsParamsKey.roomsMax),
        ),
        [DeclarationsParamsKey.propertyType]: getPropertyTypeFromUrl(
            searchParams.getAll(DeclarationsParamsKey.propertyType),
        ),
    };
};