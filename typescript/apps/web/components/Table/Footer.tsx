import { Table as ReactTable } from '@tanstack/react-table';
import { Divider, Group, Pagination, Text, TextInput, Select, Button } from '@mantine/core';
import { Person } from './makeData';

export function Footer({ table }: { table: ReactTable<Person> }) {
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

        <span>
          Go to page:
          <TextInput
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            style={{ width: 62 }}
          />
        </span>
        <Text size="sm">Rows per page: </Text>
        <Select
          style={{ width: 72 }}
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
