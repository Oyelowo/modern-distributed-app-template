import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { makeData, Person } from "./makeData.tsx";
import { fuzzyFilter } from "./helpers.ts";
import { useColumns } from "./columns.tsx";
import { Footer } from "./Footer.tsx";
import { Header } from "./Header.tsx";

const data = makeData(50000);

export function TableDataGrid() {
  const { columns } = useColumns();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
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

  const firstFilterId = table.getState().columnFilters[0]?.id;
  const firstSorterId = table.getState().sorting[0]?.id;
  const { setSorting } = table;
  useEffect(() => {
    //   Sets fullName column as sorting
    if (firstFilterId === "fullName") {
      if (firstSorterId !== "fullName") {
        setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [firstFilterId, firstSorterId, setSorting]);

  return (
    <>
      <TextInput
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.currentTarget.value)}
        placeholder="Search all columns..."
      />
      <div style={{ overflowX: "auto" }}>
        <div>
          {
            /* {table.getAllColumns().map((c) => (
          <>
          column {c.id}
          <ColumnFilter column={c} table={table} />
          </>
        ))} */
          }
        </div>
        <div />
        <Table striped highlightOnHover verticalSpacing="sm">
          <Header table={table} />

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td style={{ minWidth: 200 }} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <Footer table={table} />
      </div>
    </>
  );
}
