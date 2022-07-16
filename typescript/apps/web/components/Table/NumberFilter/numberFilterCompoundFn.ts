import { RowNumber, FilterProps, filterRow } from './../helpers';
import { FilterFn } from '@tanstack/react-table';
import { filterNumBySingleCondition } from './shared';
import { Person } from '../makeData';


export const numberFilterCompoundFn: FilterFn<Person> = (
  row,
  columnId,
  filters: FilterProps[],
  addMeta
) => {
  const rowValue = Number(row.getValue(columnId));

  return filterRow({
    onFilterRowValue: ({ operator, filterValue }) =>
      filterNumBySingleCondition({
        operator,
        filterValue,
        rowValue,
        addMeta,
      })
    ,
    filterProps: filters,
  });
};

numberFilterCompoundFn.autoRemove = (val) => !val;

export const operatorsValuesAndLabels: Array<{
  value: RowNumber['operator'];
  label: string;
}> = [
    {
      value: 'eq',
      label: 'Equals',
    },
    {
      value: 'gt',
      label: 'Greater than',
    },
    {
      value: 'gt_or_eq',
      label: 'Greate than or Equals',
    },
    {
      value: 'lt',
      label: 'Less than',
    },
    {
      value: 'lt_or_eq',
      label: 'Less than or equal',
    },
    {
      value: 'not_eq',
      label: 'Not equal',
    },
    {
      value: 'fuzzy',
      label: 'Fuzzy',
    },
  ];
