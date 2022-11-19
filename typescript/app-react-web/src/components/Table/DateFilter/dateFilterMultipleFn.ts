import { FilterFn } from "@tanstack/react-table";
import {
  FilterMultipleProps,
  filterRowByMultipleFilters,
  RowDate,
} from "../helpers.ts";
import { filterDateRow } from "./shared.ts";

export const dateFilterCompoundFn: FilterFn<unknown> = (
  row,
  columnId,
  filters: FilterMultipleProps<Date>[],
  addMeta,
) => {
  const rowValue = new Date(row.getValue<string>(columnId));

  return filterRowByMultipleFilters({
    onFilterRowValue: ({ operator, filterValue }) =>
      filterDateRow({
        operator,
        filterValue,
        rowValue,
        addMeta,
      }),
    filterProps: filters,
  });
};

dateFilterCompoundFn.autoRemove = (val) => !val;

export const operatorsValuesAndLabels: {
  value: RowDate["operator"];
  label: string;
}[] = [
  {
    value: "between",
    label: "Between",
  },
  {
    value: "is_after",
    label: "After",
  },
  {
    value: "is_same",
    label: "Same date",
  },
  {
    value: "is_before",
    label: "Bofore",
  },
  {
    value: "on_or_after",
    label: "On or after",
  },
  {
    value: "on_or_before",
    label: "On or before",
  },
  {
    value: "fuzzy",
    label: "Fuzzy",
  },
];
