import { getSingleNumberFromUrl, getStringsArrayFromUrl } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";

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
        [DeclarationsParamsKey.propertyType]: getStringsArrayFromUrl(
            searchParams.getAll(DeclarationsParamsKey.propertyType),
        ),
    };
};