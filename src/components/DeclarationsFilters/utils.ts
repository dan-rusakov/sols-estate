import { type ParsedUrlQuery } from "querystring";
import { getSingleNumberFromUrl, getStringsArrayFromUrl } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";

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
    };
};