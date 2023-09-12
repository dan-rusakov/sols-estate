import { $Enums } from "@prisma/client";

export enum DeclarationsParamsKey {
    location = 'location',
    priceMin = 'priceMin',
    priceMax = 'priceMax',
}

export const propertyTypeDict: Record<$Enums.PropertyType, string> = {
    [$Enums.PropertyType.VILLA]: 'Villa',
    [$Enums.PropertyType.APARTMENT]: 'Apartment',
    [$Enums.PropertyType.TOWNHOUSE]: 'Townhouse',
}