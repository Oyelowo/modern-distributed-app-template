import { Column, Table } from '@tanstack/react-table';
import { Person } from '../makeData';
import { DateFilter } from './DateFilter';
import { NumberFilterSimple } from '../NumberFilter/NumberFilterSimple';
import { NumberFilterCompound } from '../NumberFilter/NumberFilterCompound';
import StringFilter from './StringFilter';

type Props = {
  //   columnId: keyof Person;
  column: Column<Person, unknown>;
  table: Table<Person>;
};

export function FiltersAll({ column, table }: Props) {
  const filterType = column.columnDef.meta?.filterType;

  switch (filterType) {
    case 'string':
      return <StringFilter column={column} table={table} />;
    case 'number_range':
      return <NumberFilterCompound column={column} table={table} />;
    case 'number_single':
      return <NumberFilterSimple column={column} table={table} />;
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
