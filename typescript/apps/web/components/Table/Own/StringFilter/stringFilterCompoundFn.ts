import {
    FilterConditionStringCompound,
    filterStringBySingleCondition,
    FilterProps,
    OperatorString,
} from './shared';
import { FilterFn } from '@tanstack/react-table';

// type Condition = FilterCompoundOperationString["conditions"];
export const stringFilterCompoundFn: FilterFn<unknown> = (
    row,
    columnId,
    filters: FilterConditionStringCompound[],
    addMeta
) => {
    const rowValue = new String(row.getValue<string>(columnId));
    // const rowValue = String(row.getValue(columnId));

    return filterStringByConditions({
        conditions: filters,
        rowValue,
        addMeta,
    });
};

stringFilterCompoundFn.autoRemove = (val) => !val;

export type StringFilterCompoundProps = {
    conditions: FilterConditionStringCompound[];
    rowValue: String;
    addMeta: FilterProps['addMeta'];
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
    rowValue: String;
    addMeta: FilterProps['addMeta'];
};

function filterNumByCompoundCond({
    currentCondition,
    previousAggregatedFilter,
    rowValue,
    addMeta,
}: FilterCompoundFnProps): boolean {
    const common = {
        rowValue: rowValue,
        addMeta,
    };
    const currentFilter = filterStringBySingleCondition({
        ...common,
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
