import { rankItem } from '@tanstack/match-sorter-utils';

import dayjs from 'dayjs';
import { FilterConditionCompound, FilterConditionSimple, FilterProps } from '../helpers';

export type OperatorDate =
    | 'is_same'
    | 'is_before'
    | 'is_after'
    | 'is_not_same'
    | 'on_or_before'
    | 'on_or_after'
    | 'fuzzy';

// Logical
export type FilterConditionDateSimple = FilterConditionSimple<OperatorDate, Date>;
export type FilterConditionDateCompound = FilterConditionCompound<OperatorDate, Date>;

export const filterDateBySingleCondition = ({
    rowValue,
    condition,
    addMeta,
}: FilterProps<OperatorDate, Date>) => {
    const rowValueDayjs = dayjs(rowValue);
    const searchFilterValue = dayjs(condition.filter);
    const isSameDay = rowValueDayjs.isSame(searchFilterValue, 'day');
    const isAfter = rowValueDayjs.isAfter(searchFilterValue);
    const isBefore = rowValueDayjs.isBefore(searchFilterValue);

    switch (condition.operator) {
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
            const itemRank = rankItem(rowValue, String(searchFilterValue));

            // Store the itemRank info
            addMeta({
                itemRank,
            });

            // Return if the item should be filtered in/out
            return itemRank.passed;
    }
};
