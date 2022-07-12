import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";
import { Person } from "../../makeData";


type OperatorString = "contains" | "not_contain" | "starts_with" | "ends_with" | "equals" | "not_equal" | "fuzzy";
export type FilterOperationString = {
    operator: OperatorString;
    value: string;
}

export const stringFilterFn: FilterFn<Person> = (row, columnId, filter: FilterOperationString, addMeta) => {
    const { operator = "fuzzy", value } = filter;
    const rowValue = String(row.getValue(columnId)).toLocaleLowerCase();
    const searchFilterValue = String(value).toLocaleLowerCase();
    switch (operator) {
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
            const itemRank = rankItem(rowValue, value);

            // Store the itemRank info
            addMeta({
                itemRank,
            });

            // Return if the item should be filtered in/out
            return itemRank.passed;
    }

};
stringFilterFn.autoRemove = (val) => !val;



// export default {
//     stringFilter: stringFilterFn,
//     numberFilter: numberFilterFn,
//     dateFilter: dateFilterFn
// };
