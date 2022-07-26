import { Column, ColumnMeta, FilterFn } from '@tanstack/react-table';
import { NumberFilterSingle } from './NumberFilter/NumberFilterSingle';
import { NumberFilterMultiple } from './NumberFilter/NumberFilterMultiple';
import { numberFilterSingleFn } from './NumberFilter/numberFilterSingleFn';
import { numberFilterMultipleFn } from './NumberFilter/numberFilterMultipleFn';
import { dateFilterCompoundFn } from './DateFilter/dateFilterMultipleFn';
import { DateFilterMultiple } from './DateFilter/DateFilterMultiple';
import { DateFilterSingle } from './DateFilter/DateFilterSingle';
import { stringFilterCompoundFn } from './StringFilter/stringFilterMultipleFn';
import { StringFilterMultiple } from './StringFilter/StringFilterMultiple';
import { StringFilterSingle } from './StringFilter/StringFilterSingle';
import { dateFilterSimpleFn } from './DateFilter/dateFilterSingleFn';
import { stringFilterSingleFn } from './StringFilter/stringFilterSingleFn';

function assertUnreachable(_x: never): never {
  throw new Error("Didn't expect to get here");
}

type FilterType = ColumnMeta<unknown, unknown>['filterType'];

const filterFunctions: Record<FilterType, FilterFn<any>> = {
  date_multiple: dateFilterCompoundFn,
  date_single: dateFilterSimpleFn,
  string_single: stringFilterSingleFn,
  string_multiple: stringFilterCompoundFn,
  number_multiple: numberFilterMultipleFn,
  number_single: numberFilterSingleFn,
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

type Props<T> = {
  column: Column<T, unknown>;
};

export function ColumnFilter<T>({ column }: Props<T>) {
  // The filterType is defined when creating
  // column definition and the type definition was added to index.d.ts
  const filterType = column.columnDef.meta?.filterType;

  switch (filterType) {
    case 'string_single':
      return <StringFilterSingle column={column} />;
    case 'string_multiple':
      return <StringFilterMultiple column={column} />;
    case 'number_multiple':
      return <NumberFilterMultiple column={column} />;
    case 'number_single':
      return <NumberFilterSingle column={column} />;
    case 'date_single':
      return <DateFilterSingle column={column} />;
    case 'date_multiple':
      return <DateFilterMultiple column={column} />;
    case null:
    case undefined:
      return <></>;

    default:
      assertUnreachable(filterType);
  }
}
