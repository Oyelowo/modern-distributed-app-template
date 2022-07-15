import { FilterFn } from '@tanstack/react-table';
import { FilterConditionDateSimple, filterDateBySingleCondition } from './shared';

export const dateFilterSimpleFn: FilterFn<unknown> = (
  row,
  columnId,
  { operator, filter }: FilterConditionDateSimple,
  addMeta
) => {
  if (!row.getValue<Date>(columnId)) {
    throw new Error('Row does not exist');
  }
  const rowValue = new Date(row.getValue<Date>(columnId));

  return filterDateBySingleCondition({
    rowValue,
    condition: {
      filter,
      operator,
    },
    addMeta,
  });
};

dateFilterSimpleFn.autoRemove = (val) => !val;
