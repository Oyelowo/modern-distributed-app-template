import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterMeta } from '@tanstack/react-table';
import { FilterFn } from '@tanstack/react-table';
import { Person } from '../../makeData';
import dayjs from 'dayjs';

export type OperatorDate =
    | 'is_same'
    | 'is_before'
    | 'is_after'
    | 'is_not_same'
    | 'on_or_before'
    | 'on_or_after'
    | 'fuzzy';

// Logical
export type AndOr = 'and' | 'or';

type FilterValueType = number | string | Date;
export type FilterConidtionSimple<
    Operator extends string,
    Filter extends FilterValueType
    > = {
        /**  operator */
        operator: Operator;
        /**  The input value used that value is being filtered by */
        filter: Filter | null;
    };

export type FilterConditionCompound<
    Operator extends string,
    Filter extends FilterValueType
    > = FilterConidtionSimple<Operator, Filter> & { logical: AndOr | null };

// export type FilterConditionDateSimple = {
//     /**  Date operator */
//     operator: OperatorDate;
//     /**  The input value used that value is being filtered by */
//     filter: Date | null;
// }

export type FilterConditionDateSimple = FilterConidtionSimple<OperatorDate, Date>;
export type FilterConditionDateCompound = FilterConditionCompound<OperatorDate, Date>;

export type FilterProps = {
    /**  The row value that is being filtered against */
    rowValue: Date;
    condition: FilterConditionDateSimple;
    /**  For react query to add  metadata to do fuzzy search */
    addMeta: (meta: FilterMeta) => void;
};

export const filterDateBySingleCondition = ({ rowValue, condition, addMeta }: FilterProps) => {
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

