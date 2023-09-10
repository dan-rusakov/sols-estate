// get single value
export const getSingleStringFromUrl = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
        const FIRST_VALUE_INDEX = 0;
        return value[FIRST_VALUE_INDEX] ?? '';
    }

    if (value) {
        return value;
    }

    return '';
};

export const getSingleNumberFromUrl = (value: string | string[] | undefined): number => {
    const DEFAULT_NUMBER_VALUE = 0;
    const stringToNumber = (value: string | undefined): number => {
        return Number(value) || DEFAULT_NUMBER_VALUE;
    }

    if (Array.isArray(value)) {
        const FIRST_VALUE_INDEX = 0;
        return stringToNumber(value[FIRST_VALUE_INDEX]);
    }

    if (value) {
        return stringToNumber(value);
    }

    return DEFAULT_NUMBER_VALUE;
};

// get multi value
export const getStringsArrayFromUrl = (value: string | string[] | undefined): string[] => {
    if (Array.isArray(value)) {
        return value;
    }

    if (value) {
        return [value];
    }

    return [];
};

interface ValuesForSearchParams {
    name: string;
    value: string | string[] | number | number[];
}
export const createSearchParamsString = (
    searchParams: URLSearchParams,
    values: ValuesForSearchParams[],
): string => {
    const params = new URLSearchParams(searchParams);

    values.forEach(({ name, value }) => {
        params.delete(name);

        if (Array.isArray(value)) {
            value.forEach((valueItem) => {
                params.append(name, valueItem.toString());
            })
        } else if (value) {
            params.append(name, value.toString());
        }
    });

    return params.toString();
};