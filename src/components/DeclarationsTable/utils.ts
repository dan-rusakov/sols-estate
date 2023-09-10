import { $Enums } from "@prisma/client";

export enum DeclarationsParamsKey {
    location = 'location'
}

export const propertyTypeDict: Record<$Enums.PropertyType, string> = {
    [$Enums.PropertyType.VILLA]: 'Villa',
    [$Enums.PropertyType.APARTMENT]: 'Apartment',
    [$Enums.PropertyType.TOWNHOUSE]: 'Townhouse',
}