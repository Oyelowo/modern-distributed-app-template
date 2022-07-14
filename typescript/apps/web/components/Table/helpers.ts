import { FilterMeta } from "@tanstack/react-table";
import { sortingFns, FilterFn, SortingFn } from '@tanstack/react-table';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';

export type OperatorLogical = "and" | "or";
export const logicalOperators: OperatorLogical[] = ["and", "or"];

export type DateFilter = Date | [Date, Date]

type FilterValueType = number | string | DateFilter /* for date range */;

export type FilterConditionSimple<
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
    > = FilterConditionSimple<Operator, Filter> & { logical: OperatorLogical | null };


export type AddMeta = (meta: FilterMeta) => void;
export type FilterProps<Operator extends string,
    FilterType extends FilterValueType> = {
        /**  The row value that is being filtered against */
        rowValue: number | string | Date;
        condition: FilterConditionSimple<Operator, FilterType>;
        /**  For react query to add  metadata to do fuzzy search */
        addMeta: AddMeta;
    }



export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta): boolean => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
        itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
    let dir = 0;

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            rowA.columnFiltersMeta[columnId]?.itemRank!,
            rowB.columnFiltersMeta[columnId]?.itemRank!
        );
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};


