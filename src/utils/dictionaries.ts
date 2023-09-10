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