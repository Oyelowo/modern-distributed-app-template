import { FilterFn } from '@tanstack/react-table';
import { FilterConditionStringSimple, filterStringBySingleCondition } from './shared';

export const stringFilterSimpleFn: FilterFn<unknown> = (
  row,
  columnId,
  { operator = 'fuzzy', filter }: FilterConditionStringSimple,
  addMeta
) => {
  const rowValue = String(row.getValue<string>(columnId));

  return filterStringBySingleCondition({
    rowValue,
    condition: {
      filter,
      operator,
    },
    addMeta,
  });
};

stringFilterSimpleFn.autoRemove = (val) => !val;
