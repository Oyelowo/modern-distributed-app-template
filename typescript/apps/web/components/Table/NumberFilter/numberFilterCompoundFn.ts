import { RowNumber, OperatorLogical } from './../helpers';
import { FilterFn } from '@tanstack/react-table';
import { AddMeta } from '../helpers';
import { filterNumBySingleCondition } from './shared';
import { Person } from '../makeData';

export type FilterProps = Pick<RowNumber, 'filterValue' | 'operator'> & {
  logical: OperatorLogical;
};
export type FilterCompoundProps = {
  filterProps: FilterProps[];
  onFilterRowValue: (filterProps: FilterProps) => boolean;
};

export function filterRow({
  filterProps,
  onFilterRowValue,
}: FilterCompoundProps): boolean {
  //   Goes through the conditions list(the logical operator("and"/"or") and the number operators(">" | "<")) and calculates
  // the boolean value until it reaches the last.
  // This determines if a row should be filtered out or not
  // e.g [true, false, true, false] => false
  // e.g [true, true, true, true] => true
  const filterRowValue = (
    previousAggregatedFilter: boolean,
    currentFilteProps: FilterProps,
  ): boolean => {
    const currentFilter = onFilterRowValue(currentFilteProps);

    if (currentFilteProps.logical === 'and') {
      return previousAggregatedFilter && currentFilter;
    }

    if (currentFilteProps.logical === 'or') {
      return previousAggregatedFilter || currentFilter;
    }

    return currentFilter;
  };

  return filterProps.reduce(filterRowValue, true);
}

export const numberFilterCompoundFn: FilterFn<Person> = (
  row,
  columnId,
  filters: FilterProps[],
  addMeta
) => {
  const rowValue = Number(row.getValue(columnId));

  return filterRow({
    onFilterRowValue: ({ operator, filterValue }) => {
      const shouldFilter = filterNumBySingleCondition({
        operator,
        filterValue,
        rowValue,
        addMeta,
      });
      return shouldFilter;
    },
    filterProps: filters,
  });
};

numberFilterCompoundFn.autoRemove = (val) => !val;

export const operatorsValuesAndLabels: Array<{
  value: RowNumber['operator'];
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
