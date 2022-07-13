import { FilterConditionNumberCompound, filterNumBySingleCondition, FilterProps, OperatorNumber } from './shared';
import { Person } from '../makeData';
import { FilterFn } from '@tanstack/react-table';

// type Condition = FilterCompoundOperationNumber["conditions"];
export const numberCompoundFilterFn: FilterFn<Person> = (
    row,
    columnId,
    filters: FilterConditionNumberCompound[],
    addMeta
) => {
    const rowValue = Number(row.getValue(columnId));
    console.log("rowValue", rowValue)
    console.log("fby", filterNumberByConditions({
        conditions: filters,
        rowValue,
        addMeta
    }))
    return filterNumberByConditions({
        conditions: filters,
        rowValue,
        addMeta
    });
};

numberCompoundFilterFn.autoRemove = (val) => !val;

export type FilterCompoundOperationNumber = {
    conditions: FilterConditionNumberCompound[];
    rowValue: number;
    addMeta: FilterProps["addMeta"]
};

export function filterNumberByConditions({
    rowValue,
    conditions,
    addMeta,
}: FilterCompoundOperationNumber): boolean {
    const res = conditions.reduce((acc, curr, i, arr) => {
        const previousCondition = i === 0 ? null : arr[i - 1];

        return filterNumByCompoundCond({
            current: curr, previous: previousCondition, rowValue, addMeta
        });
    }, true);

    return res;
}

type FilterCompoundFnProps = {
    current: FilterConditionNumberCompound;
    previous: FilterConditionNumberCompound | null;
    rowValue: number;
    addMeta: FilterProps["addMeta"]
}

function filterNumByCompoundCond({
    current,
    previous,
    rowValue,
    addMeta
}: FilterCompoundFnProps): boolean {
    const common = {
        rowValue: rowValue,
        addMeta,
    }
    const currentFilter = filterNumBySingleCondition({
        ...common,
        condition: {
            operator: current.operator,
            filter: current.filter,
        },
    })

    if (!previous) {
        return currentFilter;
    }

    const previousFilter = filterNumBySingleCondition({
        ...common,
        condition: {
            operator: previous.operator,
            filter: previous.filter,
        }
    })


    if (current.logical === 'and') {
        return previousFilter && currentFilter;
    }

    if (current.logical === 'or') {
        return previousFilter || currentFilter;
    }

    return currentFilter
}




export const operatorsValuesAndLabels: Array<{
    value: OperatorNumber;
    label: string;
}> = [
        {
            value: 'eq',
            label: 'Equals',
        },
        {
            value: 'gt',
            label: 'Greater than',
        },
        {
            value: 'gt_or_eq',
            label: 'Greate than or Equals',
        },
        {
            value: 'lt',
            label: 'Less than',
        },
        {
            value: 'lt_or_eq',
            label: 'Less than or equal',
        },
        {
            value: 'not_eq',
            label: 'Not equal',
        },
        {
            value: 'fuzzy',
            label: 'Fuzzy',
        },
    ];