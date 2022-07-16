import { RowNumber, OperatorLogical } from './../helpers';
import { FilterFn } from '@tanstack/react-table';
import { AddMeta } from '../helpers';
import {
  filterNumBySingleCondition,
} from './shared';
import { Person } from '../makeData';


export type NumberFilterProps = RowNumber & { logical: OperatorLogical }
export type NumberFilterCompoundProps = {
  filterProps: NumberFilterProps[];
  rowValue: number;
  addMeta: AddMeta;
};

export function filterNumberByConditions({
  rowValue,
  filterProps,
  addMeta,
}: NumberFilterCompoundProps): boolean {
  //   Goes through the conditions list and calculates
  // the boolean value until it reaches the last.
  // This determines if a row should be filtered out or not
  // e.g [true, false, true, false] => false
  // e.g [true, true, true, true] => true
  const res = filterProps.reduce(
    (previousAggregatedFilter, currentFilteProps) => {
      const currentFilter = filterNumBySingleCondition({
        rowValueType: "number",
        operator: currentFilteProps.operator,
        filterValue: currentFilteProps.filterValue,
        rowValue,
        addMeta,
      });

      if (currentFilteProps.logical === 'and') {
        return previousAggregatedFilter && currentFilter;
      }

      if (currentFilteProps.logical === 'or') {
        return previousAggregatedFilter || currentFilter;
      }

      return currentFilter;
    },
    true
  );

  return res;
}


export const numberFilterCompoundFn: FilterFn<Person> = (
  row,
  columnId,
  filters: NumberFilterProps[],
  addMeta
) => {
  const rowValue = Number(row.getValue(columnId));

  return filterNumberByConditions({
    filterProps: filters,
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
