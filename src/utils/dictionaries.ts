import { $Enums } from "@prisma/client";

interface BaseDictStructure {
    name: string;
    slug: string;
}

export const getNameFromDict = (slug: string, dict: BaseDictStructure[] | undefined): string => {
    if (!dict) {
        return slug;
    }

    return dict.find(dictValue => dictValue.slug === slug)?.name ?? slug;
}

export const AgentTypeDict: Record<$Enums.AgentType, string> = {
    [$Enums.AgentType.AGENCY]: 'Agency',
    [$Enums.AgentType.PERSONAL]: 'Free agent',
}

export type AgentType = keyof typeof $Enums.AgentType;

export const propertyTypeDict: Record<$Enums.PropertyType, string> = {
    [$Enums.PropertyType.VILLA]: 'Villa',
    [$Enums.PropertyType.APARTMENT]: 'Apartment',
    [$Enums.PropertyType.TOWNHOUSE]: 'Townhouse',
}

export type commissionTypes = 0 | 3 | 5 | 10;
export const commissionValues: commissionTypes[] = [0, 10, 5, 3];

export const commissionTypeDict: Record<commissionTypes, string> = {
    '0': '0% — netto',
    '3': '3% — include',
    '5': '5% — include',
    '10': '10% — include',
};