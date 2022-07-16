import { RowNumber, OperatorLogical } from './../helpers';
import { FilterFn } from '@tanstack/react-table';
import { AddMeta } from '../helpers';
import {
  filterNumBySingleCondition,
} from './shared';
import { Person } from '../makeData';



type FilterCompoundFnProps = {
  currentCondition: RowNumber;
  logical: OperatorLogical;
  previousAggregatedFilter: boolean;
  rowValue: number;
  addMeta: AddMeta;
};

function filterNumByCompoundCond({
  currentCondition,
  previousAggregatedFilter,
  rowValue,
  logical,
  addMeta,
}: FilterCompoundFnProps): boolean {

  const currentFilter = filterNumBySingleCondition({
    rowValueType: "number",
    operator: currentCondition.operator,
    filterValue: currentCondition.filterValue,
    rowValue,
    addMeta,
  });

  if (logical === 'and') {
    return previousAggregatedFilter && currentFilter;
  }

  if (logical === 'or') {
    return previousAggregatedFilter || currentFilter;
  }

  return currentFilter;
}

export type NumberFilterCondition = RowNumber & { logical: OperatorLogical }
export type NumberFilterCompoundProps = {
  conditions: NumberFilterCondition[];
  rowValue: number;
  addMeta: AddMeta;
};

// type Condition = {RowNumber, logical: OperatorLogical}
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
  const res = conditions.reduce(
    (acc, curr) =>
      filterNumByCompoundCond({
        currentCondition: curr,
        previousAggregatedFilter: acc,
        rowValue,
        logical: "and",
        addMeta,
      }),
    true
  );

  return res;
}



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

export const operatorsValuesAndLabels: Array<{
  value: RowNumber["operator"];
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
