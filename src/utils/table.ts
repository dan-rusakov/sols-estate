import { getSingleNumberFromUrl } from "./url";
import dayjs from "dayjs";

export const TAKE_RECORDS_AMOUNT = 2;

export enum TableParamsName {
    page = 'page'
}

export const getTableParamsFromSearchParams = (
    searchParams: URLSearchParams,
) => {
    return {
        [TableParamsName.page]: getSingleNumberFromUrl(
            searchParams.getAll(TableParamsName.page),
        ),
    };
};

export const cellRangeValue = (min: string | number | null, max: string | number | null): string => {
    if (!min && !max) {
        return '—';
    }

    if (!min) {
        return `to ${max}`;
    }

    if (!max) {
        return `from ${min}`;
    }

    return `${min} — ${max}`;
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