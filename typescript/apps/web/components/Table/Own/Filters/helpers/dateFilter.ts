import { rankItem } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";
import { Person } from "../../makeData";
import dayjs from "dayjs";


type OperatorDate = "is_same" | "is_before" | "is_after" | "is_not_same" | "on_or_before" | "on_or_after" | "none";
export type FilterOperationDate = {
  operator: OperatorDate;
  value: Date;
}

export const dateFilterFn: FilterFn<Person> = (row, columnId, filter: FilterOperationDate, addMeta) => {
  const { operator = "is_same", value } = filter;
  const rowValue = dayjs(row.getValue(columnId));
  const searchFilterValue = dayjs(value);

  switch (operator) {
    case "is_same":
      return rowValue.isSame(searchFilterValue);

    case "is_not_same":
      return !rowValue.isSame(searchFilterValue);

    case "is_after":
      return rowValue.isAfter(searchFilterValue);

    case "on_or_after":
      return rowValue.isAfter(searchFilterValue) || rowValue.isSame(searchFilterValue);

    case "is_before":
      return rowValue.isBefore(searchFilterValue);

    case "on_or_before":
      return rowValue.isBefore(searchFilterValue) || rowValue.isSame(searchFilterValue);

    default:
      return true
  }
};
dateFilterFn.autoRemove = (val) => !val;
