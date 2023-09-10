import { type ParsedUrlQuery } from "querystring";
import { getSingleNumberFromUrl } from "./url";

export const TAKE_RECORDS_AMOUNT = 1;

export enum TableParamsName {
    page = 'page'
}

export const getTableParamsFromQuery = (
    query: ParsedUrlQuery,
) => {
    return {
        [TableParamsName.page]: getSingleNumberFromUrl(
            query[TableParamsName.page],
        ),
    };
};

export const getTableParamsFromSearchParams = (
    searchParams: URLSearchParams,
) => {
    return {
        [TableParamsName.page]: getSingleNumberFromUrl(
            searchParams.getAll(TableParamsName.page),
        ),
    };
};