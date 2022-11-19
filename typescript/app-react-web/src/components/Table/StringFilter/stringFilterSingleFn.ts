import { FilterFn } from "@tanstack/react-table";
import { FilterSingleProps } from "../helpers.ts";
import { filterStringRow } from "./shared.ts";

export const stringFilterSingleFn: FilterFn<unknown> = (
  row,
  columnId,
  filter: FilterSingleProps<string>,
  addMeta,
) => {
  const { operator = "fuzzy", filterValue } = filter;
  const rowValue = String(row.getValue<string>(columnId));

  return filterStringRow({
    rowValue,
    filterValue,
    operator,
    addMeta,
  });
};

stringFilterSingleFn.autoRemove = (val) => !val;
