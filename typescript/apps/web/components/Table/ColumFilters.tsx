import { Column, Table, ColumnMeta, FilterFn } from '@tanstack/react-table';
import { Person } from './makeData';
import { NumberFilterSimple } from './NumberFilter/NumberFilterSimple';
import { NumberFilterCompound } from './NumberFilter/NumberFilterCompound';
import { numberFilterSimpleFn } from './NumberFilter/numberFilterSimpleFn';
import { numberFilterCompoundFn } from './NumberFilter/numberFilterCompoundFn';
import { dateFilterCompoundFn } from './DateFilter/dateFilterCompoundFn';
import { DateFilterCompound } from './DateFilter/DateFilterCompound';
import { DateFilterSimple } from './DateFilter/DateFilterSimple';
import { stringFilterCompoundFn } from './StringFilter/stringFilterCompoundFn';
import { StringFilterCompound } from './StringFilter/StringFilterCompound';
import { StringFilterSimple } from './StringFilter/StringFilterSimple';
import { dateFilterSimpleFn } from './DateFilter/dateFilterSimpleFn';
import { stringFilterSimpleFn } from './StringFilter/stringFilterSimpleFn';

type Props<T> = {
  column: Column<T, unknown>;
  table: Table<Person>;
};

export function ColumnFilters<T>({ column, table }: Props<T>) {
  const filterType = column.columnDef.meta?.filterType;
  console.log('filterType', filterType);

  switch (filterType) {
    case 'string':
      return <StringFilterSimple column={column} />;
    case 'string_compound':
      return <StringFilterCompound column={column} />;
    case 'enum':
      return <StringFilterSimple column={column} />;
    case 'number_range':
      return <NumberFilterCompound column={column} table={table} />;
    case 'number_single':
      return <NumberFilterSimple column={column} table={table} />;
    case 'date_single':
      return <DateFilterSimple column={column} />;
    case 'date_range':
      return <DateFilterCompound column={column} />;
    case null:
    case undefined:
      return <></>;

    default:
      assertUnreachable(filterType);
  }
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

type FilterType = Exclude<ColumnMeta['filterType'], null>;

const filterFunctions: Record<FilterType, FilterFn<any>> = {
  date_range: dateFilterCompoundFn,
  date_single: dateFilterSimpleFn,
  enum: stringFilterSimpleFn,
  string: stringFilterSimpleFn,
  string_compound: stringFilterCompoundFn,
  number_range: numberFilterCompoundFn,
  number_single: numberFilterSimpleFn,
};

type ReturnTypeFn<T> = {
  filterFn: FilterFn<T>;
  meta: {
    filterType: FilterType;
  };
};
export function getFilterFn<T>(filterType: FilterType): ReturnTypeFn<T> {
  return {
    filterFn: filterFunctions[filterType],
    meta: {
      filterType,
    },
  };
}
