export const getSingleFilterValueFromUrl = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
        const FIRST_VALUE_INDEX = 0;
        return value[FIRST_VALUE_INDEX] ?? '';
    }

    if (value) {
        return value;
    }

    return '';
};

export const createSearchParamsString = (
    searchParams: URLSearchParams,
    name: string,
    value: string,
): string => {
    const params = new URLSearchParams(searchParams);

    params.delete(name);

    if (value) {
        params.append(name, value);
    }

    return params.toString();
};