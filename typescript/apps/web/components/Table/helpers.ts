import { FilterMeta } from "@tanstack/react-table";


export type OperatorLogical = "and" | "or";
export const logicalOperators: OperatorLogical[] = ["and", "or"];

type FilterValueType = number | string | Date;

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


export type FilterProps<Operator extends string,
    Filter extends FilterValueType> = {
        /**  The row value that is being filtered against */
        rowValue: number;
        condition: FilterConditionSimple<Operator, Filter>;
        /**  For react query to add  metadata to do fuzzy search */
        addMeta: (meta: FilterMeta) => void

    }


