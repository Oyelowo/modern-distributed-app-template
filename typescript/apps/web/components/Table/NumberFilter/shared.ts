
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterMeta } from "@tanstack/react-table";
import { FilterConditionSimple, FilterConditionCompound } from "../helpers";

export type OperatorNumber = "gt" | "lt" | "eq" | "not_eq" | "gt_or_eq" | "lt_or_eq" | "fuzzy";

export type FilterConditionNumberSimple = FilterConditionSimple<OperatorNumber, number>;
export type FilterConditionNumberCompound = FilterConditionCompound<OperatorNumber, number>;


export type FilterProps = {
    /**  The row value that is being filtered against */
    rowValue: number;
    condition: FilterConditionNumberSimple;
    /**  For react query to add  metadata to do fuzzy search */
    addMeta: (meta: FilterMeta) => void

}

export const filterNumBySingleCondition = ({ rowValue, condition, addMeta }: FilterProps) => {
    const searchFilterValue = condition.filter ?? true;

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

