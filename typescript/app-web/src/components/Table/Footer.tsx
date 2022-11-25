import { Table as ReactTable } from "@tanstack/react-table";
import {
  Button,
  Divider,
  Group,
  Kbd,
  Pagination,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { Person } from "./makeData.js";

export function Footer({ table }: { table: ReactTable<Person> }) {
  useHotkeys([
    ["N", table.nextPage],
    ["P", table.previousPage],
  ]);
  return (
    <>
      <Group>
        <Pagination
          initialPage={1}
          page={table.getState().pagination.pageIndex}
          onChange={(page) => table.setPageIndex(page)}
          total={table.getPageCount()}
          siblings={2}
          boundaries={2}
        />

        <Text color="dimmed">
          Press <Kbd>N</Kbd> / <Kbd>P</Kbd> to go to next/previous page
        </Text>
      </Group>
      <Group mt="sm">
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          variant="default"
          mr="xs"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
        <Divider orientation="vertical" />

        <span>
          <div>Page</div>
          <Text variant="gradient">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Text>
        </span>

        <Divider orientation="vertical" variant="dashed" />

        <span>
          Go to page:
          <TextInput
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => table.setPageIndex(Number(e.target.value))}
            style={{ width: 62 }}
          />
        </span>
        <Text size="sm">Rows per page:</Text>
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
