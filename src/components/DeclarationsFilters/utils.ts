import { type ParsedUrlQuery } from "querystring";
import { getStringsArrayFromUrl } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";

export const getDeclarationsFiltersFromQuery = (
    query: ParsedUrlQuery,
) => {
    return {
        [DeclarationsParamsKey.location]: getStringsArrayFromUrl(
            query[DeclarationsParamsKey.location],
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
    };
};