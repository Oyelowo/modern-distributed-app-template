import { RowNumber } from './../helpers';
import { FilterFn } from '@tanstack/react-table';
import { filterNumBySingleCondition } from './shared';
import { Person } from '../makeData';

export const numberFilterSimpleFn: FilterFn<Person> = (
  row,
  columnId,
  filter: Pick<RowNumber, "filterValue" | "operator">,
  addMeta
) => {
  const { operator = "gt", filterValue } = filter;
  const rowValue = Number(row.getValue(columnId));

  return filterNumBySingleCondition({
    rowValueType: "number",
    rowValue,
    filterValue: Number(filterValue),
    operator,
    addMeta,
  });
};
numberFilterSimpleFn.autoRemove = (val) => !val;
