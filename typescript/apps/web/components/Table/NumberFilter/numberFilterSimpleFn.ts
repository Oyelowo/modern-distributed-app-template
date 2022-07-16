
import { FilterFn } from '@tanstack/react-table';
import { filterNumBySingleCondition } from './shared';
import { Person } from '../makeData';
import { FilterSingleProps } from './../helpers';

export const numberFilterSimpleFn: FilterFn<Person> = (
  row,
  columnId,
  filter: FilterSingleProps<number>,
  addMeta
) => {
  const { operator = "eq", filterValue } = filter;
  const rowValue = Number(row.getValue(columnId));

  return filterNumBySingleCondition({
    rowValue,
    filterValue: Number(filterValue),
    operator,
    addMeta,
  });
};
numberFilterSimpleFn.autoRemove = (val) => !val;
