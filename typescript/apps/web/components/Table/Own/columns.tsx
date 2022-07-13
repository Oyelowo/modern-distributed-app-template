import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Person } from './makeData';
import { fuzzyFilter, fuzzySort } from './ReactTable';
import { stringFilterFn } from './Filters/helpers/stringFilter';
import { numberFilterFn } from './NumberFilter/simpleHelper';
import { dateFilterFn } from './Filters/helpers/dateFilter';
import dayjs from 'dayjs';
import { numberCompoundFilterFn } from './NumberFilter/compoundHelper';

export function useColumns() {
  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Id',
        /* 
         Remember, the accessed value is what is used to sort, filter, etc. 
         so you'll want to make sure your accessor function returns a primitive 
         value that can be manipulated in a meaningful way. If you return a 
         non-primitive value like an object or array, you will need the appropriate 
         filter/sort/grouping functions to manipulate them, or even supply your own
        */
        accessorKey: 'id',
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
        meta: {
          filterType: 'string',
        },
      },
      {
        //   🧠 An easy way to remember: If you define a column with an accessor function, either provide a string header or provide a unique id property.
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
        meta: {
          filterType: 'string',
        },
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
        meta: {
          filterType: 'string',
        },
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
        // filterFn: fuzzyFilter,
        // aggregatedCell
        sortingFn: fuzzySort,
        meta: {
          filterType: 'string',
        },
      },

      {
        accessorKey: 'createdAt',
        header: () => 'Created At',
        footer: (props) => props.column.id,
        filterFn: dateFilterFn,
        cell: (info) => dayjs(info.getValue<Date>()).format('DD/MM/YYYY'),
        meta: {
          filterType: 'date_single',
        },
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
        // filterFn: numberFilterFn,
        filterFn: numberCompoundFilterFn,
        meta: {
          filterType: 'number_single',
        },
      },

      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
        meta: {
          filterType: 'number_single',
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
        meta: {
          filterType: 'enum',
        },
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
        meta: {
          filterType: 'number_single',
        },
      },
    ],
    []
  );

  return { columns };
}
