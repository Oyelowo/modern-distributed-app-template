import { numberFilterSimpleFn } from './NumberFilter/numberFilterSimpleFn';
import { stringFilterFn } from './Filters/helpers/stringFilter';
import { dateFilterFn } from './Filters/helpers/dateFilter';
import { ColumnMeta, FilterFn } from '@tanstack/react-table';
import { numberFilterCompoundFn } from './NumberFilter/numberFilterCompoundFn';

type FilterType = Exclude<ColumnMeta["filterType"], null>

const filterFunctions: Record<FilterType, FilterFn<any>> = {
    date_range: dateFilterFn,
    date_single: dateFilterFn,
    enum: dateFilterFn,
    string: stringFilterFn,
    number_range: numberFilterCompoundFn,
    number_single: numberFilterSimpleFn
}

type ReturnTypeFn<T> = {
    filterFn: FilterFn<T>,
    meta: {
        filterType: FilterType,
    }
}
export function getFilterFn<T>(filterType: FilterType): ReturnTypeFn<T> {

    return {
        filterFn: filterFunctions[filterType],
        meta: {
            filterType,
        }
    }
}