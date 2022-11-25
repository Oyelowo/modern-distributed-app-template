import { Column, FilterFn } from "@tanstack/react-table";
import { DateFilterMultiple } from "./DateFilter/DateFilterMultiple.js";
import { dateFilterCompoundFn } from "./DateFilter/dateFilterMultipleFn.js";
import { DateFilterSingle } from "./DateFilter/DateFilterSingle.js";
import { dateFilterSimpleFn } from "./DateFilter/dateFilterSingleFn.js";
import { NumberFilterMultiple } from "./NumberFilter/NumberFilterMultiple.js";
import { numberFilterMultipleFn } from "./NumberFilter/numberFilterMultipleFn.js";
import { NumberFilterSingle } from "./NumberFilter/NumberFilterSingle.js";
import { numberFilterSingleFn } from "./NumberFilter/numberFilterSingleFn.js";
import { StringFilterMultiple } from "./StringFilter/StringFilterMultiple.js";
import { stringFilterCompoundFn } from "./StringFilter/stringFilterMultipleFn.js";
import { StringFilterSingle } from "./StringFilter/StringFilterSingle.js";
import { stringFilterSingleFn } from "./StringFilter/stringFilterSingleFn.js";
import z from "zod";

const columnMetaSchema = z.object({
  filterType: z.union([
    z.literal("number_single"),
    z.literal("number_multiple"),
    z.literal("date_single"),
    z.literal("date_multiple"),
    z.literal("string_single"),
    z.literal("string_multiple"),
  ]),
});

type ColumnMeta = z.infer<typeof columnMetaSchema>;

type ReturnTypeFn<T> = {
  filterFn: FilterFn<T>;
  meta: ColumnMeta;
};

export function getFilterFn<T>(
  filterType: ColumnMeta["filterType"]
): ReturnTypeFn<T> {
  const filterFunctions: Record<ColumnMeta["filterType"], FilterFn<any>> = {
    date_multiple: dateFilterCompoundFn,
    date_single: dateFilterSimpleFn,
    string_single: stringFilterSingleFn,
    string_multiple: stringFilterCompoundFn,
    number_multiple: numberFilterMultipleFn,
    number_single: numberFilterSingleFn,
  };
  return {
    filterFn: filterFunctions[filterType],
    meta: {
      filterType,
    },
  };
}

type Props<T> = {
  column: Column<T, unknown>;
};

function getColumnMeta<T>(column: Column<T, unknown>): ColumnMeta {
  return columnMetaSchema.parse(column.columnDef.meta);
}

export function ColumnFilter<T>({ column }: Props<T>): JSX.Element {
  const filterType = getColumnMeta(column).filterType;

  const filters: Record<ColumnMeta["filterType"], JSX.Element> = {
    string_single: <StringFilterSingle column={column} />,
    string_multiple: <StringFilterMultiple column={column} />,
    number_multiple: <NumberFilterMultiple column={column} />,
    number_single: <NumberFilterSingle column={column} />,
    date_single: <DateFilterSingle column={column} />,
    date_multiple: <DateFilterMultiple column={column} />,
  };
  return filterType ? filters[filterType] : <></>;
}
