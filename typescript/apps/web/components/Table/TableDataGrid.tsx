import { useEffect, useState } from 'react';
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  Table as ReactTable,
} from '@tanstack/react-table';
import { makeData, Person } from './makeData';
import { fuzzyFilter } from './helpers';
import {
  Divider,
  Group,
  Pagination,
  Table,
  Text,
  TextInput,
  Select,
  ActionIcon,
  Button,
  Container,
} from '@mantine/core';
import { ArrowsSort, SortAscending, SortDescending, ArrowRight } from 'tabler-icons-react';
import { useStyles } from './styles';
import { useColumns } from './columns';
import { ColumnFilter } from './ColumFilters';
import { useDebouncedValue, useForm } from '@mantine/hooks';

const data = makeData(50000);

export function TableDataGrid() {
  const { columns } = useColumns();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [debouncedGlobalFilter] = useDebouncedValue(globalFilter, 500);

  const table = useReactTable<Person>({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter: debouncedGlobalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    //   Sets fullName column as sorting
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div>
      <div>
        <TextInput
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.currentTarget.value)}
          placeholder="Search all columns..."
        />
        {/* {table.getAllColumns().map((c) => (
          <>
            column {c.id}
            <ColumnFilter column={c} table={table} />
          </>
        ))} */}
      </div>
      <div />
      <Table striped highlightOnHover>
        <Header table={table} />

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Footer table={table} />
    </div>
  );
}

function Header({ table }: { table: ReactTable<Person> }) {
  const { classes } = useStyles();
  const Sorter = ({ isAsc }: { isAsc: boolean }) =>
    isAsc ? <SortAscending /> : <SortDescending />;

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        //   Header Row
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((h) => {
            return (
              <th key={h.id} colSpan={h.colSpan}>
                {!h.isPlaceholder && (
                  <>
                    <div
                      className={h.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={h.column.getToggleSortingHandler()}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}

                      {h.column.getCanSort() &&
                        (h.column.getIsSorted() ? (
                          <Sorter isAsc={h.column.getIsSorted() === 'asc'} />
                        ) : (
                          <ArrowsSort className={classes.disableSortIcon} />
                        ))}
                    </div>

                    {h.column.getCanFilter() && (
                      <div>
                        <ColumnFilter column={h.column} table={table} />
                      </div>
                    )}
                  </>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}

function Footer({ table }: { table: ReactTable<Person> }) {
  const [activePage, setPage] = useState(1);

  return (
    <>
      <Pagination
        initialPage={1}
        page={table.getState().pagination.pageIndex}
        onChange={(page) => table.setPageIndex(page)}
        total={table.getPageCount()}
        siblings={2}
        boundaries={2}
      />

      <Group mt="sm">
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </Button>
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </Button>
        <Divider orientation="vertical" />

        <span>
          <div>Page</div>
          <Text variant="gradient">
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </Text>
        </span>

        <Divider orientation="vertical" variant="dashed" />

        <span className="flex items-center gap-1">
          Go to page:
          <TextInput
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <Text size="sm">Rows per page: </Text>
        <Select
          style={{ width: '72px' }}
          variant="filled"
          data={[10, 20, 30, 40, 50].map(String)}
          value={table.getState().pagination.pageSize.toString()}
          onChange={(value) => table.setPageSize(Number(value))}
        />
      </Group>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </>
  );
}
