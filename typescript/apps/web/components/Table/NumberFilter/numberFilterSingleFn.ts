
import { FilterFn } from '@tanstack/react-table';
import { filterNumBySingleFilter } from './shared';
import { Person } from '../makeData';
import { FilterSingleProps } from '../helpers';

export const numberFilterSingleFn: FilterFn<Person> = (
  row,
  columnId,
  filter: FilterSingleProps<number>,
  addMeta
) => {
  const { operator = "eq", filterValue } = filter;
  const rowValue = Number(row.getValue(columnId));

  return filterNumBySingleFilter({
    rowValue,
    filterValue: Number(filterValue),
    operator,
    addMeta,
  });
};
numberFilterSingleFn.autoRemove = (val) => !val;
