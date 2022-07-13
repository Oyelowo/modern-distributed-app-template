import { Column, Table } from '@tanstack/react-table';
import { Person } from '../makeData';
import { DateFilter } from './DateFilter';
import NumberFilter from './NumberFilter';
import {NumberFilterCompound} from './NumberFilterCompound';
import StringFilter from './StringFilter';

export function FiltersAll({
  //   columnId,
  column,
  table,
}: {
  //   columnId: keyof Person;
  column: Column<Person, unknown>;
  table: Table<Person>;
}) {
  const k = column.id as keyof Person | 'fullName';
  const filterType = column.columnDef.meta?.filterType;
  //   if (filterType === undefined) {
  //     throw new Error('Filter type has to be specified at path <columnDef>.<col>.meta.filterTypes');
  //   }
  console.log('filterType', filterType);
  switch (filterType) {
    case 'string':
      return <StringFilter column={column} table={table} />;
    case 'number_range':
      return <NumberFilter column={column} table={table} />;
    case 'number_single':
      return <NumberFilterCompound column={column} table={table} />;
      // return <NumberFilter column={column} table={table} />;
    case 'date_single':
      return <DateFilter column={column} table={table} />;
    case 'date_range':
      return <DateFilter column={column} table={table} />;
    case 'enum':
      return <StringFilter column={column} table={table} />;
    case null:
    case undefined:
      return <></>;

    default:
      assertUnreachable(filterType);
  }
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
