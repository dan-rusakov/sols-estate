import { type $Enums } from "@prisma/client";

// property type
export type PropertyTypeAny = 'any';
export const PropertyTypeAnyValue: PropertyTypeAny = 'any';

export const validatePropertyTypeAnyValue = (type: keyof typeof $Enums.PropertyType | PropertyTypeAny): keyof typeof $Enums.PropertyType | null => type === 'any' ? null : type;

export const validatePropertyTypesListAnyValue = (types: (keyof typeof $Enums.PropertyType | PropertyTypeAny)[]): (keyof typeof $Enums.PropertyType | null)[] => {
    return types.map(validatePropertyTypeAnyValue);
}

export const excludePropertyTypesListAnyValue = (types: (keyof typeof $Enums.PropertyType | PropertyTypeAny)[]): (keyof typeof $Enums.PropertyType)[] | null => {
    const propertyTypeWithoutAny = types.filter((type): type is keyof typeof $Enums.PropertyType => type !== 'any');

    if (!propertyTypeWithoutAny.length) {
        return null;
    }

    return propertyTypeWithoutAny;
}