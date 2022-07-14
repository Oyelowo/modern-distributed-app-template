import { AddMeta } from './../helpers';
import {
    FilterConditionStringCompound,
    filterStringBySingleCondition,
    OperatorString,
} from './shared';
import { FilterFn } from '@tanstack/react-table';

export const stringFilterCompoundFn: FilterFn<unknown> = (
    row,
    columnId,
    filters: FilterConditionStringCompound[],
    addMeta
) => {
    const rowValue = row.getValue<string>(columnId);

    return filterStringByConditions({
        conditions: filters,
        rowValue,
        addMeta,
    });
};

stringFilterCompoundFn.autoRemove = (val) => !val;

export type StringFilterCompoundProps = {
    conditions: FilterConditionStringCompound[];
    rowValue: string;
    addMeta: AddMeta;
};

export function filterStringByConditions({
    rowValue,
    conditions,
    addMeta,
}: StringFilterCompoundProps): boolean {
    //   Goes through the conditions list and calculates
    // the boolean value until it reaches the last.
    // This determines if a row should be filtered out or not
    // e.g [true, false, true, false] => false
    // e.g [true, true, true, true] => true
    const res = conditions.reduce((acc, curr) => {
        return filterNumByCompoundCond({
            currentCondition: curr,
            previousAggregatedFilter: acc,
            rowValue,
            addMeta,
        });
    }, true);

    return res;
}

type FilterCompoundFnProps = {
    currentCondition: FilterConditionStringCompound;
    previousAggregatedFilter: boolean;
    rowValue: string;
    addMeta: AddMeta;
};

// Aggregates filters until the latest/current
function filterNumByCompoundCond({
    currentCondition,
    previousAggregatedFilter,
    rowValue,
    addMeta,
}: FilterCompoundFnProps): boolean {
    const currentFilter = filterStringBySingleCondition({
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
    value: OperatorString;
    label: string;
}> = [
        {
            value: 'contains',
            label: 'Contains',
        },
        {
            value: 'not_contain',
            label: 'Does not Contain',
        },
        {
            value: 'starts_with',
            label: 'Starts with',
        },
        {
            value: 'ends_with',
            label: 'Ends with',
        },
        {
            value: 'equals',
            label: 'Equals',
        },
        {
            value: 'not_equal',
            label: 'Not equal',
        },
    ];
