import { $Enums } from "@prisma/client";
import dayjs from "dayjs";

export const cellRangeValue = (min: string | number | null, max: string | number | null): string => {
    if (!min && !max) {
        return '';
    }

    if (!min) {
        return `to ${max}`;
    }

    if (!max) {
        return `from ${min}`;
    }

    return `from ${min} to ${max}`;
}

export type FormatNumberType = 'default' | 'numeric';

export const formatNumber = (number: number, formattingType: FormatNumberType = 'default'): string => {
    if (formattingType === 'numeric') {
        return new Intl.NumberFormat().format(number);
    }

    return number.toString();
}

export const formatDateToDateString = (date: Date): string => {
    return dayjs(date).format('DD.MM.YYYY');
}

export const propertyTypeDict: Record<$Enums.PropertyType, string> = {
    [$Enums.PropertyType.VILLA]: 'Villa',
    [$Enums.PropertyType.APARTMENT]: 'Apartment',
    [$Enums.PropertyType.TOWNHOUSE]: 'Townhouse',
}