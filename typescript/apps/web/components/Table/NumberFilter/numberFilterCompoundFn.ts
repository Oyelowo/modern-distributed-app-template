import { FilterFn } from '@tanstack/react-table';
import { AddMeta } from '../helpers';
import {
    FilterConditionNumberCompound as NumberFilterCondition,
    filterNumBySingleCondition,
    OperatorNumber,
} from './shared';
import { Person } from '../makeData';

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
        addMeta,
    });
};

numberFilterCompoundFn.autoRemove = (val) => !val;

export type NumberFilterCompoundProps = {
    conditions: NumberFilterCondition[];
    rowValue: number;
    addMeta: AddMeta;
};

export function filterNumberByConditions({
    rowValue,
    conditions,
    addMeta,
}: NumberFilterCompoundProps): boolean {
    //   Goes through the conditions list and calculates
    // the boolean value until it reaches the last.
    // This determines if a row should be filtered out or not
    // e.g [true, false, true, false] => false
    // e.g [true, true, true, true] => true
    const res = conditions.reduce((acc, curr) => filterNumByCompoundCond({
            currentCondition: curr,
            previousAggregatedFilter: acc,
            rowValue,
            addMeta,
        }), true);

    return res;
}

type FilterCompoundFnProps = {
    currentCondition: NumberFilterCondition;
    previousAggregatedFilter: boolean;
    rowValue: number;
    addMeta: AddMeta;
};

function filterNumByCompoundCond({
    currentCondition,
    previousAggregatedFilter,
    rowValue,
    addMeta,
}: FilterCompoundFnProps): boolean {
    const currentFilter = filterNumBySingleCondition({
        rowValue,
        addMeta,
        condition: currentCondition,
    });

    if (currentCondition.logical === 'and') {
        return previousAggregatedFilter && currentFilter;
    }

    if (currentCondition.logical === 'or') {
        return previousAggregatedFilter || currentFilter;
    }

    return currentFilter;
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
