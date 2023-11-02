// property type
export type PropertyTypeAny = 'any';
export const PropertyTypeAnyValue: PropertyTypeAny = 'any';

export const validatePropertyTypeListAnyValue = (types: string[]): string[] => {
    return types.filter(type => type !== PropertyTypeAnyValue);
}

export const validatePropertyTypeAnyValue = (type: string): string | null => {
    return type === PropertyTypeAnyValue ? null : type;
}

export const excludePropertyTypesListAnyValue = (types: string[]): string[] | null => {
    const propertyTypeWithoutAny = types.filter((type) => type !== 'any');

    if (!propertyTypeWithoutAny.length) {
        return null;
    }

    return propertyTypeWithoutAny;
}