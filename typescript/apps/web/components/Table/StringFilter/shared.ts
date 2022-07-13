import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterMeta } from '@tanstack/react-table';
import { FilterConditionCompound, FilterConditionSimple } from '../helpers';

export type OperatorString = "contains" | "not_contain" | "starts_with" | "ends_with" | "equals" | "not_equal" | "fuzzy";

export type FilterConditionStringSimple = FilterConditionSimple<OperatorString, string>;
export type FilterConditionStringCompound = FilterConditionCompound<OperatorString, string>;

export type FilterProps = {
    /**  The row value that is being filtered against */
    rowValue: string;
    condition: FilterConditionStringSimple;
    /**  For react query to add  metadata to do fuzzy search */
    addMeta: (meta: FilterMeta) => void;
};

export const filterStringBySingleCondition = ({ rowValue, condition, addMeta }: FilterProps) => {
    const searchFilterValue = condition.filter ?? "";

    switch (condition.operator) {
        case "starts_with":
            return rowValue.startsWith(searchFilterValue)

        case "ends_with":
            return rowValue.endsWith(searchFilterValue)

        case "equals":
            return rowValue === searchFilterValue

        case "not_equal":
            return rowValue !== searchFilterValue

        case "contains":
            return rowValue.includes(searchFilterValue)

        case "not_contain":
            return !rowValue.includes(searchFilterValue)

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

