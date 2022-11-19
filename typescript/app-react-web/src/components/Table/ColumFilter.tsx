import { Column, FilterFn } from "@tanstack/react-table";
import { DateFilterMultiple } from "./DateFilter/DateFilterMultiple.tsx";
import { dateFilterCompoundFn } from "./DateFilter/dateFilterMultipleFn.ts";
import { DateFilterSingle } from "./DateFilter/DateFilterSingle.tsx";
import { dateFilterSimpleFn } from "./DateFilter/dateFilterSingleFn.ts";
import { NumberFilterMultiple } from "./NumberFilter/NumberFilterMultiple.tsx";
import { numberFilterMultipleFn } from "./NumberFilter/numberFilterMultipleFn.ts";
import { NumberFilterSingle } from "./NumberFilter/NumberFilterSingle.tsx";
import { numberFilterSingleFn } from "./NumberFilter/numberFilterSingleFn.ts";
import { StringFilterMultiple } from "./StringFilter/StringFilterMultiple.tsx";
import { stringFilterCompoundFn } from "./StringFilter/stringFilterMultipleFn.ts";
import { StringFilterSingle } from "./StringFilter/StringFilterSingle.tsx";
import { stringFilterSingleFn } from "./StringFilter/stringFilterSingleFn.ts";
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
  filterType: ColumnMeta["filterType"],
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
