import { type ParsedUrlQuery } from "querystring";
import { FiltersName } from "./DeclarationsFilters.types";
import { getSingleStringFromUrl } from "~/utils/url";

export const getDeclarationsFiltersFromQuery = (
    query: ParsedUrlQuery,
) => {
    return {
        [FiltersName.location]: getSingleStringFromUrl(
            query[FiltersName.location],
        ),
    };
};

export const getDeclarationsFiltersFromSearchParams = (
    searchParams: URLSearchParams,
) => {
    return {
        [FiltersName.location]: getSingleStringFromUrl(
            searchParams.getAll(FiltersName.location),
        ),
    };
};