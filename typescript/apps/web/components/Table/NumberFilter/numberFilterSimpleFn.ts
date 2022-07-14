import { FilterFn } from '@tanstack/react-table';
import { FilterConditionNumberSimple, filterNumBySingleCondition } from './shared';
import { Person } from '../makeData';

export const numberFilterSimpleFn: FilterFn<Person> = (
  row,
  columnId,
  filter: FilterConditionNumberSimple,
  addMeta
) => {
  const { operator = 'fuzzy', filter: value } = filter;
  const rowValue = Number(row.getValue(columnId));
  const searchFilterValue = Number(value);

  return filterNumBySingleCondition({
    rowValue,
    condition: {
      filter: searchFilterValue,
      operator,
    },
    addMeta,
  });
};
numberFilterSimpleFn.autoRemove = (val) => !val;
