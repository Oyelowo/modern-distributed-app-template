import { FilterSingleProps } from '../helpers';
import { FilterFn } from '@tanstack/react-table';
import { filterStringBySingleFilter } from './shared';

export const stringFilterSingleFn: FilterFn<unknown> = (
  row,
  columnId,
  filter: FilterSingleProps<string>,
  addMeta
) => {
  const { operator = 'fuzzy', filterValue } = filter;
  const rowValue = String(row.getValue<string>(columnId));

  return filterStringBySingleFilter({
    rowValue,
    filterValue,
    operator,
    addMeta,
  });

};

stringFilterSingleFn.autoRemove = (val) => !val;
