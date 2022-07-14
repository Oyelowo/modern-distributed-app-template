import { FilterFn } from '@tanstack/react-table';
import { AddMeta } from '../helpers';
import {
  FilterConditionDateCompound as DateFilterCondition,
  filterDateBySingleCondition,
  OperatorDate,
} from './shared';

export type DateFilterCompoundProps = {
  conditions: DateFilterCondition[];
  rowValue: Date;
  addMeta: AddMeta;
};

type FilterCompoundFnProps = {
  currentCondition: DateFilterCondition;
  previousAggregatedFilter: boolean;
  rowValue: Date;
  addMeta: AddMeta;
};

function filterDateByCompoundCond({
  currentCondition,
  previousAggregatedFilter,
  rowValue,
  addMeta,
}: FilterCompoundFnProps): boolean {
  const currentFilter = filterDateBySingleCondition({
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
  const res = conditions.reduce(
    (acc, curr) =>
      filterDateByCompoundCond({
        currentCondition: curr,
        previousAggregatedFilter: acc,
        rowValue,
        addMeta,
      }),
    true
  );

  return res;
}

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

export const operatorsValuesAndLabels: Array<{
  value: OperatorDate;
  label: string;
}> = [
  {
    value: 'is_after',
    label: 'After',
  },
  {
    value: 'between',
    label: 'Between',
  },
  {
    value: 'is_same',
    label: 'Same date',
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
