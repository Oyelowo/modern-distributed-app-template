import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Person } from './makeData';
import { fuzzyFilter, fuzzySort } from './ReactTable';
import { stringFilterFn } from './Filters/helpers/stringFilter';
import { numberFilterFn } from './Filters/helpers/NumberFilter';

export function useColumns() {
  const columns: ColumnDef<Person>[] = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
        footer: (props) => props.column.id,
      },
      {
        //   🧠 An easy way to remember: If you define a column with an accessor function, either provide a string header or provide a unique id property.
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: stringFilterFn,
        // filterFn: fuzzyFilter,
        sortingFn: fuzzySort,
        // aggregatedCell
      },

      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
      },

      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id,
        filterFn: numberFilterFn,
      },
    ],
    []
  );

  return { columns };
}
