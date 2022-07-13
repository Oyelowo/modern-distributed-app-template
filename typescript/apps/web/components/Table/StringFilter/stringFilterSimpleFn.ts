import { FilterConditionStringSimple } from './shared';
import { filterStringBySingleCondition } from './shared';
import { FilterFn } from '@tanstack/react-table';


export const stringFilterSimpleFn: FilterFn<unknown> = (
    row,
    columnId,
    { operator = 'fuzzy', filter }: FilterConditionStringSimple,
    addMeta
) => {
    const rowValue = row.getValue<string>(columnId);

    return filterStringBySingleCondition({
        rowValue,
        condition: {
            filter,
            operator,
        },
        addMeta,
    });
};

stringFilterSimpleFn.autoRemove = (val) => !val;
