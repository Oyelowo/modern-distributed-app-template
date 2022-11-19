import { FilterFn } from "@tanstack/react-table";
import {
  FilterMultipleProps,
  filterRowByMultipleFilters,
  RowString,
} from "../helpers.ts";
import { filterStringRow } from "./shared.ts";

export const stringFilterCompoundFn: FilterFn<unknown> = (
  row,
  columnId,
  filters: FilterMultipleProps<string>[],
  addMeta,
) => {
  const rowValue = row.getValue<string>(columnId);

  return filterRowByMultipleFilters({
    onFilterRowValue: ({ operator, filterValue }) =>
      filterStringRow({
        operator,
        filterValue,
        rowValue,
        addMeta,
      }),
    filterProps: filters,
  });
};

stringFilterCompoundFn.autoRemove = (val) => !val;

export const operatorsValuesAndLabels: Array<{
  value: RowString["operator"];
  label: string;
}> = [
  {
    value: "fuzzy",
    label: "Allow typo",
  },
  {
    value: "contains",
    label: "Contains",
  },
  {
    value: "not_contain",
    label: "Does not Contain",
  },
  {
    value: "starts_with",
    label: "Starts with",
  },
  {
    value: "ends_with",
    label: "Ends with",
  },
  {
    value: "equals",
    label: "Equals",
  },
  {
    value: "not_equal",
    label: "Not equal",
  },
];
