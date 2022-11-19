import { FilterFn } from "@tanstack/react-table";
import { filterNumberRow } from "./shared.ts";
import { Person } from "../makeData.tsx";
import { FilterSingleProps } from "../helpers.ts";

export const numberFilterSingleFn: FilterFn<Person> = (
  row,
  columnId,
  filter: FilterSingleProps<number>,
  addMeta,
) => {
  const { operator = "eq", filterValue } = filter;
  const rowValue = Number(row.getValue(columnId));

  return filterNumberRow({
    rowValue,
    filterValue: Number(filterValue),
    operator,
    addMeta,
  });
};
numberFilterSingleFn.autoRemove = (val) => !val;
