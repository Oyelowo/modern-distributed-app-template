import { FilterConditionNumberCompound as NumberFilterCondition, filterNumBySingleCondition, FilterProps, OperatorNumber } from './shared';
import { Person } from '../makeData';
import { FilterFn } from '@tanstack/react-table';

// type Condition = FilterCompoundOperationNumber["conditions"];
export const numberFilterCompoundFn: FilterFn<Person> = (
    row,
    columnId,
    filters: NumberFilterCondition[],
    addMeta
) => {
    const rowValue = Number(row.getValue(columnId));

    return filterNumberByConditions({
        conditions: filters,
        rowValue,
        addMeta
    });
};

numberFilterCompoundFn.autoRemove = (val) => !val;

export type NumberFilterCompoundProps = {
    conditions: NumberFilterCondition[];
    rowValue: number;
    addMeta: FilterProps["addMeta"]
};

export function filterNumberByConditions({
    rowValue,
    conditions,
    addMeta,
}: NumberFilterCompoundProps): boolean {
    // let shouldFilter = true;
    // console.log(conditions)
    console.log("rowValue", rowValue)
    const res = conditions.reduce((acc, curr, i, arr) => {
        const previousCondition = i === 0 ? true : acc;
        console.log("acc", acc)
        console.log("curr", curr)
        return filterNumByCompoundCond({
            current: curr, previous: previousCondition, rowValue, addMeta
        });
    }, true);

    return res;
    // return true
}


type FilterCompoundFnProps = {
    current: NumberFilterCondition;
    previous: boolean;
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

    // if (previous === null) {
    //     return currentFilter;
    // }

    const previousFilter = previous

    console.log("previousFilter && currentFilter", previousFilter, currentFilter)
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