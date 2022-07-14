import { FilterFn } from '@tanstack/react-table';
import { FilterConditionDateSimple, filterDateBySingleCondition } from './shared';

export const dateFilterSimpleFn: FilterFn<unknown> = (
    row,
    columnId,
    { operator, filter }: FilterConditionDateSimple,
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
