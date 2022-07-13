import { Column, Table, ColumnMeta, FilterFn } from '@tanstack/react-table';
import { Person } from '../makeData';
import { DateFilter } from './DateFilter';
import { NumberFilterSimple } from '../NumberFilter/NumberFilterSimple';
import { NumberFilterCompound } from '../NumberFilter/NumberFilterCompound';
import StringFilter from './StringFilter';
import { numberFilterSimpleFn } from '../NumberFilter/numberFilterSimpleFn';
import { stringFilterFn } from '../Filters/helpers/stringFilter';
import { dateFilterFn } from '../Filters/helpers/dateFilter';
import { numberFilterCompoundFn } from '../NumberFilter/numberFilterCompoundFn';

type Props<T> = {
  //   columnId: keyof Person;
  column: Column<Person, unknown>;
  table: Table<Person>;
};

export function FiltersAll<T>({ column, table }: Props<T>) {
  const filterType = column.columnDef.meta?.filterType;

  switch (filterType) {
    case 'string':
      return <StringFilter column={column} table={table} />;
    case 'number_range':
      return <NumberFilterCompound column={column} table={table} />;
    case 'number_single':
      return <NumberFilterSimple column={column} table={table} />;
    case 'date_single':
      return <DateFilter column={column} table={table} />;
    case 'date_range':
      return <DateFilter column={column} table={table} />;
    case 'enum':
      return <StringFilter column={column} table={table} />;
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
  date_range: dateFilterFn,
  date_single: dateFilterFn,
  enum: dateFilterFn,
  string: stringFilterFn,
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
