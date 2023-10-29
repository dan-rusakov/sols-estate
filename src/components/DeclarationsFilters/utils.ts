import { getSingleNumberFromUrl, getStringsArrayFromUrl } from "~/utils/url";
import { DeclarationsParamsKey } from "../DeclarationsTable/utils";
import { $Enums } from "@prisma/client";
import { PropertyTypeAnyValue, type PropertyTypeAny } from "~/utils/entities";

export const getPropertyTypeFromUrl = (value: string | string[] | undefined): (keyof typeof $Enums.PropertyType | PropertyTypeAny)[] | null => {
    const stringsArrayFromUrl = getStringsArrayFromUrl(value);

    if (!stringsArrayFromUrl) {
        return null;
    }

    return stringsArrayFromUrl?.reduce<(keyof typeof $Enums.PropertyType | PropertyTypeAny)[]>((acc, stringValue) => {
        if (Object.keys($Enums.PropertyType).includes(stringValue)) {
            acc.push(stringValue as keyof typeof $Enums.PropertyType);
        }

        if (stringValue === PropertyTypeAnyValue) {
            acc.push(stringValue);
        }

        return acc;
    }, []);
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