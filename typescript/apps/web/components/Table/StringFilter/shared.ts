import { rankItem } from '@tanstack/match-sorter-utils';
import { Column } from '@tanstack/react-table';
import { useMemo } from 'react';
import { FilterConditionCompound, FilterConditionSimple, FilterProps } from '../helpers';

export type OperatorString =
    | 'contains'
    | 'not_contain'
    | 'starts_with'
    | 'ends_with'
    | 'equals'
    | 'not_equal'
    | 'fuzzy';

export type FilterConditionStringSimple = FilterConditionSimple<OperatorString, string>;
export type FilterConditionStringCompound = FilterConditionCompound<OperatorString, string>;

export const filterStringBySingleCondition = ({
    rowValue: rv,
    condition,
    addMeta,
}: FilterProps<OperatorString, string>) => {
    const searchFilterValue = condition.filter?.toLocaleLowerCase() ?? '';
    const rowValue = String(rv).toLocaleLowerCase();

    switch (condition.operator) {
        case 'starts_with':
            return rowValue.startsWith(searchFilterValue);

        case 'ends_with':
            return rowValue.endsWith(searchFilterValue);

        case 'equals':
            return rowValue === searchFilterValue;

        case 'not_equal':
            return rowValue !== searchFilterValue;

        case 'contains':
            return rowValue.includes(searchFilterValue);

        case 'not_contain':
            return !rowValue.includes(searchFilterValue);

        default:
            // Rank the item
            const itemRank = rankItem(rowValue, searchFilterValue);

            // Store the itemRank info
            addMeta({
                itemRank,
            });

            // Return if the item should be filtered in/out
            return itemRank.passed;
    }
};

export function useUniqueColumnValues<T>(column: Column<T, unknown>) {
    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    );

    return sortedUniqueValues;
}
