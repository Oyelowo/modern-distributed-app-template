import { Column, ColumnMeta, FilterFn } from '@tanstack/react-table';
import { FilterDataType } from '../..';
import { DateFilterMultiple } from './DateFilter/DateFilterMultiple';
import { dateFilterCompoundFn } from './DateFilter/dateFilterMultipleFn';
import { DateFilterSingle } from './DateFilter/DateFilterSingle';
import { dateFilterSimpleFn } from './DateFilter/dateFilterSingleFn';
import { NumberFilterMultiple } from './NumberFilter/NumberFilterMultiple';
import { numberFilterMultipleFn } from './NumberFilter/numberFilterMultipleFn';
import { NumberFilterSingle } from './NumberFilter/NumberFilterSingle';
import { numberFilterSingleFn } from './NumberFilter/numberFilterSingleFn';
import { StringFilterMultiple } from './StringFilter/StringFilterMultiple';
import { stringFilterCompoundFn } from './StringFilter/stringFilterMultipleFn';
import { StringFilterSingle } from './StringFilter/StringFilterSingle';
import { stringFilterSingleFn } from './StringFilter/stringFilterSingleFn';

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

export function ColumnFilter<T>({ column }: Props<T>): JSX.Element {
  // The filterType is defined when creating
  // column definition and the type definition was added to index.d.ts
  const filterType = column.columnDef.meta?.filterType;

  const filters: Record<FilterDataType, JSX.Element> = {
    string_single: <StringFilterSingle column={column} />,
    string_multiple: <StringFilterMultiple column={column} />,
    number_multiple: <NumberFilterMultiple column={column} />,
    number_single: <NumberFilterSingle column={column} />,
    date_single: <DateFilterSingle column={column} />,
    date_multiple: <DateFilterMultiple column={column} />,
  };
  return filterType ? filters[filterType] : <></>;
}
