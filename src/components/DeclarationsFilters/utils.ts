import { type ParsedUrlQuery } from "querystring";
import { FiltersName } from "./DeclarationsFilters.types";
import { getStringsArrayFromUrl } from "~/utils/url";

export const getDeclarationsFiltersFromQuery = (
    query: ParsedUrlQuery,
) => {
    return {
        [FiltersName.location]: getStringsArrayFromUrl(
            query[FiltersName.location],
        ),
    };
};

export const getDeclarationsFiltersFromSearchParams = (
    searchParams: URLSearchParams,
) => {
    return {
        [FiltersName.location]: getStringsArrayFromUrl(
            searchParams.getAll(FiltersName.location),
        ),
    };
};