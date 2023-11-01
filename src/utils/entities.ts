// property type
export type PropertyTypeAny = 'any';
export const PropertyTypeAnyValue: PropertyTypeAny = 'any';

export const validatePropertyTypeAnyValue = (types: string[]): string[] => {
    return types.filter(type => type !== PropertyTypeAnyValue);
}

export const excludePropertyTypesListAnyValue = (types: string[]): string[] | null => {
    const propertyTypeWithoutAny = types.filter((type) => type !== 'any');

    if (!propertyTypeWithoutAny.length) {
        return null;
    }

    return propertyTypeWithoutAny;
}