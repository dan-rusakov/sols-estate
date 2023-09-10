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

interface ValuesForSearchParams {
    name: string;
    value: string | number;
}
export const createSearchParamsString = (
    searchParams: URLSearchParams,
    values: ValuesForSearchParams[],
): string => {
    const params = new URLSearchParams(searchParams);

    values.forEach(({ name, value }) => {
        params.delete(name);

        if (value) {
            params.append(name, value.toString());
        }
    });

    return params.toString();
};