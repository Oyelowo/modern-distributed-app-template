import { Person } from './../../makeData';
import { FilterFn } from "@tanstack/react-table";

// Logical
type AndOr = 'and' | 'or';

// Operators:
// Number:
// String:
// Date:

// Value

type OperatorNumber = 'gt' | 'lt' | 'eq' | 'not_eq' | 'gt_or_eq' | 'lt_or_eq' | 'fuzzy';
export interface Condition {
    logical: AndOr | null;
    operator: OperatorNumber;
    filter: number;
}

// console.log("lowo")

const data: Condition[] = [
    {
        logical: null,
        operator: 'gt',
        filter: 3,
    },
    {
        logical: 'and',
        operator: 'lt_or_eq',
        filter: 13,
    },
    // {
    //   logical: null,
    //   primitives: "gt",
    //   value: 3
    // },
];

const value = 12;
export type FilterCompoundOperationNumber = {
    conditions: Condition[];
    filterValue: number;
}
export function filterNumberByConditions({
    conditions,
    filterValue,
}: FilterCompoundOperationNumber): boolean {
    const res = conditions.reduce((acc, curr, i, arr) => {
        const prev = i === 0 ? null : arr[i - 1];
        //  console.log("xxx", {current: curr, prev, value})
        //  console.log("search({current: curr, prev, value})", search({current: curr, prev, value}))
        // const k = search({ current: curr, prev, value });
        return search({ current: curr, prev, value: filterValue });
    }, true);
    return res;
}


export const numberCompoundFilterFn: FilterFn<Person> = (row, columnId, filter: FilterCompoundOperationNumber["conditions"], addMeta) => {
    // const { operator = "fuzzy", value } = filter;
    const rowValue = Number(row.getValue(columnId));
    const searchFilterValue = Number(value);
    return filterNumberByConditions({
        conditions: filter,
        filterValue: rowValue
    })

}

// searchAll(data, 5)
// console.log("tester", searchAll(data, 13))

function search({
    current,
    prev,
    value,
}: {
    current: Condition;
    prev: Condition | null;
    value: number;
}): boolean {
    // if (!current.logical){
    //   // it's the first
    //    return operate(value, current.primitives, current.value)
    // }
    if (!prev) {
        // it's the first
        return operate({
            rowValue: value,
            operator: current.operator,
            searchFilterValue: current.filter,
        });
    }
    if (current.logical === 'and') {
        console.log('value, prev.operator, prev.value', value, prev.operator, prev.filter);
        console.log('value, current.operator, current.value)', value, current.operator, current.filter);
        console.log(
            'operate(value, prev.operator, prev.value)',
            operate({ rowValue: value, operator: prev.operator, searchFilterValue: prev.filter })
        );
        console.log(
            'operate(value, current.operator, current.value)',
            operate({ rowValue: value, operator: current.operator, searchFilterValue: current.filter })
        );
        // it's the first
        return (
            operate({ rowValue: value, operator: prev.operator, searchFilterValue: prev.filter }) &&
            operate({ rowValue: value, operator: current.operator, searchFilterValue: current.filter })
        );
    }
    if (current.logical === 'or') {
        // it's the first
        return (
            operate({ rowValue: value, operator: prev.operator, searchFilterValue: prev.filter }) ||
            operate({ rowValue: value, operator: current.operator, searchFilterValue: current.filter })
        );
    }

    // it's the first
    return operate({ rowValue: value, operator: current.operator, searchFilterValue: current.filter });
}

function operate({
    rowValue,
    operator,
    searchFilterValue,
}: {
    rowValue: number;
    operator: OperatorNumber;
    searchFilterValue: number;
}): boolean {
    switch (operator) {
        case 'eq':
            return rowValue === searchFilterValue;

        case 'not_eq':
            return rowValue !== searchFilterValue;
        case 'gt':
            return rowValue > searchFilterValue;
        case 'gt_or_eq':
            return rowValue >= searchFilterValue;

        case 'lt':
            return rowValue < searchFilterValue;

        case 'lt_or_eq':
            return rowValue <= searchFilterValue;
        default:
            return true;
    }
}
