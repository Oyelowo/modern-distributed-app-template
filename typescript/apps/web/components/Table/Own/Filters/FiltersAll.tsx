import { Column, Table } from '@tanstack/react-table';
import { Person } from '../makeData';
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
  const k = column.id as keyof Person | "fullName";
  console.log('kfdddffk', k);
  switch (k) {
    case 'id':
      return <StringFilter column={column} table={table} />;
    case 'firstName':
      return <StringFilter column={column} table={table} />;
    case 'lastName':
      return <StringFilter column={column} table={table} />;
    case 'progress':
      return <StringFilter column={column} table={table} />;
    case 'status':
      return <StringFilter column={column} table={table} />;
    case 'subRows':
      return <StringFilter column={column} table={table} />;
    case 'visits':
      return <StringFilter column={column} table={table} />;
    case 'age':
      return <StringFilter column={column} table={table} />;
    case 'fullName':
      return <StringFilter column={column} table={table} />;

    default:
      assertUnreachable(k);
  }
}

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
