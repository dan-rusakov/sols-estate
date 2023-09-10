import { type ParsedUrlQuery } from "querystring";
import { FiltersName } from "./DeclarationsFilters.types";
import { getSingleFilterValueFromUrl } from "~/utils/filters";

export const getDeclarationsFiltersFromQuery = (
    query: ParsedUrlQuery,
): Record<FiltersName, string> => {
    return {
        [FiltersName.location]: getSingleFilterValueFromUrl(
            query[FiltersName.location],
        ),
    };
};

export const getDeclarationsFiltersFromSearchParams = (
    searchParams: URLSearchParams,
): Record<FiltersName, string> => {
    return {
        [FiltersName.location]: getSingleFilterValueFromUrl(
            searchParams.getAll(FiltersName.location),
        ),
    };
};