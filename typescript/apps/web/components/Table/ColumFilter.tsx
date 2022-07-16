import { Column, ColumnMeta, FilterFn } from '@tanstack/react-table';
import { NumberFilterSingle } from './NumberFilter/NumberFilterSingle';
import { NumberFilterMultiple } from './NumberFilter/NumberFilterMultiple';
import { numberFilterSingleFn } from './NumberFilter/numberFilterSingleFn';
import { numberFilterMultipleFn } from './NumberFilter/numberFilterMultipleFn';
import { dateFilterCompoundFn } from './DateFilter/dateFilterCompoundFn';
import { DateFilterCompound } from './DateFilter/DateFilterCompound';
import { DateFilterSimple } from './DateFilter/DateFilterSimple';
import { stringFilterCompoundFn } from './StringFilter/stringFilterMultipleFn';
import { StringFilterMultiple } from './StringFilter/StringFilterMultiple';
import { StringFilterSingle } from './StringFilter/StringFilterSingle';
import { dateFilterSimpleFn } from './DateFilter/dateFilterSimpleFn';
import { stringFilterSingleFn } from './StringFilter/stringFilterSingleFn';

function assertUnreachable(_x: never): never {
  throw new Error("Didn't expect to get here");
}

type FilterType = Exclude<ColumnMeta['filterType'], null>;

const filterFunctions: Record<FilterType, FilterFn<any>> = {
  date_range: dateFilterCompoundFn,
  date_single: dateFilterSimpleFn,
  string: stringFilterSingleFn,
  string_compound: stringFilterCompoundFn,
  number_range: numberFilterMultipleFn,
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
  const filterType = column.columnDef.meta?.filterType;

  switch (filterType) {
    case 'string':
      return <StringFilterSingle column={column} />;
    case 'string_compound':
      return <StringFilterMultiple column={column} />;
    case 'number_range':
      return <NumberFilterMultiple column={column} />;
    case 'number_single':
      return <NumberFilterSingle column={column} />;
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
