import { FilterFn } from "@tanstack/react-table";
import { FilterSingleProps } from "../helpers.js";
import { filterDateRow } from "./shared.js";

export const dateFilterSimpleFn: FilterFn<unknown> = (
  row,
  columnId,
  filter: FilterSingleProps<Date>,
  addMeta,
) => {
  const { operator = "between", filterValue } = filter;
  if (!row.getValue<Date>(columnId)) {
    throw new Error("Row does not exist");
  }
  const rowValue = new Date(row.getValue<Date>(columnId));

  return filterDateRow({
    rowValue,
    filterValue,
    operator,
    addMeta,
  });
};

dateFilterSimpleFn.autoRemove = (val) => !val;
