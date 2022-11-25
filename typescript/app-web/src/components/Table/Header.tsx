import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { Button, Text } from "@mantine/core";
import { Person } from "./makeData.js";
import { ColumnFilter } from "./ColumFilter.js";
import { Sorter } from "./Sorter.js";

export function Header({ table }: { table: ReactTable<Person> }) {
	return (
		<thead>
			{table.getHeaderGroups().map((headerGroup) => (
				//   Header Row
				<tr key={headerGroup.id}>
					{headerGroup.headers.map((h) => (
						<th key={h.id} colSpan={h.colSpan} style={{ minWidth: 200 }}>
							{!h.isPlaceholder && (
								<span style={{ display: "flex" }}>
									<Button
										variant="subtle"
										className={
											h.column.getCanSort() ? "cursor-pointer select-none" : ""
										}
										onClick={h.column.getToggleSortingHandler()}
										size="xs"
									>
										<Text mr="xs">
											{flexRender(h.column.columnDef.header, h.getContext())}
										</Text>
										<Sorter column={h.column} />
									</Button>

									{h.column.getCanFilter() && (
										<ColumnFilter column={h.column} />
									)}
								</span>
							)}
						</th>
					))}
				</tr>
			))}
		</thead>
	);
}
