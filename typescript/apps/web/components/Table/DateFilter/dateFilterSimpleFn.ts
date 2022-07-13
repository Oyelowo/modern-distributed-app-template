import { FilterConditionDateSimple } from './shared';
import { filterDateBySingleCondition } from './shared';
import { FilterFn } from '@tanstack/react-table';


export const dateFilterSimpleFn: FilterFn<unknown> = (
    row,
    columnId,
    { operator = 'fuzzy', filter }: FilterConditionDateSimple,
    addMeta
) => {
    const rowValue = new Date(row.getValue<Date>(columnId));

    return filterDateBySingleCondition({
        rowValue,
        condition: {
            filter,
            operator,
        },
        addMeta,
    });
};

dateFilterSimpleFn.autoRemove = (val) => !val;
