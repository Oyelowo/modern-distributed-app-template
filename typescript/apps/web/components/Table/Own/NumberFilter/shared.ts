
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn, FilterMeta } from "@tanstack/react-table";
import { Person } from "../makeData";


export type OperatorNumber = "gt" | "lt" | "eq" | "not_eq" | "gt_or_eq" | "lt_or_eq" | "fuzzy";
// Logical
type AndOr = 'and' | 'or';

export type FilterConditionNumberSimple = {
    /**  number operator */
    operator: OperatorNumber;
    /**  The input value used that value is being filtered by */
    filter: number | null;
}

export type FilterConditionNumberCompound = FilterConditionNumberSimple & { logical: AndOr | null; }


export type FilterProps = {
    /**  The row value that is being filtered against */
    rowValue: number;
    condition: FilterConditionNumberSimple;
    /**  For react query to add  metadata to do fuzzy search */
    addMeta: (meta: FilterMeta) => void

}

export const filterNumBySingleCondition = ({ rowValue, condition, addMeta }: FilterProps) => {
    const searchFilterValue = condition.filter;
    if (!searchFilterValue) {
        return true
    }
    switch (condition.operator) {
        case "eq":
            return rowValue === searchFilterValue;

        case "not_eq":
            return rowValue !== searchFilterValue;
        case "gt":
            return rowValue > searchFilterValue;
        case "gt_or_eq":
            return rowValue >= searchFilterValue;

        case "lt":
            return rowValue < searchFilterValue;

        case "lt_or_eq":
            return rowValue <= searchFilterValue;

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

