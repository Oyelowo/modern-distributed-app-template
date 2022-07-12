
import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";
import { Person } from "../../makeData";


type OperatorNumber = "gt" | "lt" | "eq" | "not_eq" | "gt_or_eq" | "lt_or_eq";
type FilterValue = {
    operator: OperatorNumber;
    value: string;
}


export const numberFilterFn: FilterFn<Person> = (row, columnId, filter: FilterValue, addMeta) => {
    const { operator = "eq", value } = filter;
    const rowValue = Number(row.getValue(columnId));
    const searchFilterValue = Number(value);

    switch (operator) {
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
            const itemRank = rankItem(rowValue, value);

            // Store the itemRank info
            addMeta({
                itemRank,
            });

            // Return if the item should be filtered in/out
            return itemRank.passed;
    }
};
numberFilterFn.autoRemove = (val) => !val;
