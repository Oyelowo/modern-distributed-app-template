import { rankItem } from '@tanstack/match-sorter-utils';
import isBetween from 'dayjs/plugin/isBetween';

import dayjs from 'dayjs';
import { DateFilter, FilterConditionCompound, FilterConditionSimple, FilterProps } from '../helpers';

dayjs.extend(isBetween);

export type OperatorDate =
    | 'between'
    | 'is_same'
    | 'is_before'
    | 'is_after'
    | 'is_not_same'
    | 'on_or_before'
    | 'on_or_after'
    | 'fuzzy';

// Logical
export type FilterConditionDateSimple = FilterConditionSimple<OperatorDate, DateFilter>;
export type FilterConditionDateCompound = FilterConditionCompound<OperatorDate, DateFilter>;

export const filterDateBySingleCondition = ({
    rowValue,
    condition,
    addMeta,
}: FilterProps<OperatorDate, DateFilter>) => {
    const rowValueDayjs = dayjs(rowValue);

    // if it's a date range
    if (Array.isArray(condition.filter)) {
        const [minDate, maxDate] = condition.filter;
        // Parameter 4 is a string with two characters; '[' means inclusive, '(' exclusive
        // '()' excludes start and end date (default)
        // '[]' includes start and end date
        // '[)' includes the start date but excludes the stop
        // Granuality offers the precision on start and end inclusive checks.
        // For example including the start date on day precision you should use 'day' as 3rd parameter.
        return rowValueDayjs.isBetween(minDate, maxDate, 'day', '[]');
    }

    const singleSearchFilterValue = dayjs(condition.filter);
    const isSameDay = rowValueDayjs.isSame(singleSearchFilterValue, 'day');
    const isAfter = rowValueDayjs.isAfter(singleSearchFilterValue);
    const isBefore = rowValueDayjs.isBefore(singleSearchFilterValue);

    switch (condition.operator) {
        case 'between':
            return isSameDay;
        case 'is_same':
            return isSameDay;

        case 'is_not_same':
            return !isSameDay;

        case 'is_after':
            return isAfter;

        case 'on_or_after':
            return isSameDay || isAfter;

        case 'is_before':
            return isBefore;

        case 'on_or_before':
            return isSameDay || isBefore;

        default:
            // Rank the item
            const itemRank = rankItem(rowValue, String(singleSearchFilterValue));

            // Store the itemRank info
            addMeta({
                itemRank,
            });

            // Return if the item should be filtered in/out
            return itemRank.passed;
    }
};
