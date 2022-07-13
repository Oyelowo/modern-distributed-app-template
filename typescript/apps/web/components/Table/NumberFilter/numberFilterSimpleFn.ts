import { FilterConditionNumberSimple } from './shared';
import { filterNumBySingleCondition } from './shared';
import { FilterFn } from '@tanstack/react-table';
import { Person } from '../makeData';


export const numberFilterSimpleFn: FilterFn<Person> = (
    row,
    columnId,
    filter: FilterConditionNumberSimple,
    addMeta
) => {
    const { operator = 'fuzzy', filter: value } = filter;
    const rowValue = Number(row.getValue(columnId));
    const searchFilterValue = Number(value);

    return filterNumBySingleCondition({
        rowValue,
        condition: {
            filter: searchFilterValue,
            operator,
        },
        addMeta,
    });
};
numberFilterSimpleFn.autoRemove = (val) => !val;
