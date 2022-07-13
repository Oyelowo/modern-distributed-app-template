import { FilterConditionStringSimple } from './shared';
import { filterStringBySingleCondition } from './shared';
import { FilterFn } from '@tanstack/react-table';


export const stringFilterSimpleFn: FilterFn<unknown> = (
    row,
    columnId,
    { operator = 'fuzzy', filter }: FilterConditionStringSimple,
    addMeta
) => {
    // const rowValue = row.getValue<String>(columnId));
    const rowValue = new String(row.getValue<String>(columnId));

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
