import {
    FilterConditionDateCompound as DateFilterCondition,
    filterDateBySingleCondition,
    FilterProps,
    OperatorDate,
} from './shared';
import { FilterFn } from '@tanstack/react-table';

export const dateFilterCompoundFn: FilterFn<unknown> = (
    row,
    columnId,
    filters: DateFilterCondition[],
    addMeta
) => {
    const rowValue = new Date(row.getValue<string>(columnId));

    return filterDateByConditions({
        conditions: filters,
        rowValue,
        addMeta,
    });
};

dateFilterCompoundFn.autoRemove = (val) => !val;

export type DateFilterCompoundProps = {
    conditions: DateFilterCondition[];
    rowValue: Date;
    addMeta: FilterProps['addMeta'];
};

export function filterDateByConditions({
    rowValue,
    conditions,
    addMeta,
}: DateFilterCompoundProps): boolean {
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
    currentCondition: DateFilterCondition;
    previousAggregatedFilter: boolean;
    rowValue: Date;
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
    const currentFilter = filterDateBySingleCondition({
        ...common,
        condition: {
            operator: currentCondition.operator,
            filter: currentCondition.filter,
        },
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
    value: OperatorDate;
    label: string;
}> = [
        {
            value: 'is_after',
            label: 'After',
        },
        {
            value: 'is_same',
            label: 'Same dat',
        },
        {
            value: 'is_before',
            label: 'Bofore',
        },
        {
            value: 'on_or_after',
            label: 'On or after',
        },
        {
            value: 'on_or_before',
            label: 'On or before',
        },
        {
            value: 'fuzzy',
            label: 'Fuzzy',
        },
    ];
