// get single value
export const getSingleStringFromUrl = (value: string | string[] | undefined): string | null => {
    if (Array.isArray(value)) {
        const FIRST_VALUE_INDEX = 0;
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return value[FIRST_VALUE_INDEX] || null;
    }

    if (value) {
        return value;
    }

    return null;
};

export const getSingleNumberFromUrl = (value: string | string[] | undefined): number | null => {
    const stringToNumber = (value: string | undefined): number | null => {
        if (!value) {
            return null;
        }

        const numberValue = Number(value);

        if (isNaN(numberValue)) {
            return null;
        }

        return numberValue;
    }

    if (Array.isArray(value)) {
        const FIRST_VALUE_INDEX = 0;
        return stringToNumber(value[FIRST_VALUE_INDEX]);
    }

    if (value) {
        return stringToNumber(value);
    }

    return null;
};

// get multi value
export const getStringsArrayFromUrl = (value: string | string[] | undefined): string[] | null => {
    if (Array.isArray(value)) {
        return value.length ? value : null;
    }

    if (value) {
        return [value];
    }

    return null;
};

interface ValuesForSearchParams {
    name: string;
    value: string | string[] | number | number[] | null;
}
export const createSearchParamsString = (
    searchParams: URLSearchParams,
    values: ValuesForSearchParams[],
): string => {
    const params = new URLSearchParams(searchParams);
    const addPrimitiveValue = (name: string, value: string | number | null): void => {
        if (typeof value === 'string' && value.length) {
            params.append(name, value);
        } else if (typeof value === 'number') {
            params.append(name, value.toString());
        }
    }

    values.forEach(({ name, value }) => {
        params.delete(name);

        if (Array.isArray(value)) {
            value.forEach((valueItem) => {
                addPrimitiveValue(name, valueItem);
            })
        } else {
            addPrimitiveValue(name, value);
        }
    });

    return params.toString();
};