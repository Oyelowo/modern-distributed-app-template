import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
// import dayjs from "dayjs";
import { Person } from "./makeData.js";
import { fuzzySort } from "./helpers.js";
import { getFilterFn } from "./ColumFilter.js";

export function useColumns() {
	const columns = useMemo<ColumnDef<Person>[]>(
		() => [
			{
				header: "Id",
				/*
         Remember, the accessed value is what is used to sort, filter, etc.
         so you'll want to make sure your accessor function returns a primitive
         value that can be manipulated in a meaningful way. If you return a
         non-primitive value like an object or array, you will need the appropriate
         filter/sort/grouping functions to manipulate them, or even supply your own
        */
				accessorKey: "id",
				footer: (props) => props.column.id,
				...getFilterFn("string_single"),
				cell: (info) => (
					<div
						title={info.getValue<string>()}
						style={{
							width: 150,
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						<>{info.getValue()}</>
					</div>
				),
			},
			{
				// accessorFn: (row) => new Date(row.dateOfBirth),
				// id: 'dateOfBirth',
				accessorKey: "dateOfBirth",
				header: () => " DOB",
				footer: (props) => props.column.id,
				cell: (info) => info.getValue<Date>().toTemporalInstant().toString(),
				...getFilterFn("date_multiple"),
			},
			{
				//   🧠 An easy way to remember: If you define a column with an accessor function, either provide a string header or provide a unique id property.
				accessorKey: "firstName",
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				...getFilterFn("string_multiple"),
			},
			{
				accessorFn: (row) => row.lastName,
				id: "lastName",
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				footer: (props) => props.column.id,
				...getFilterFn("string_multiple"),
			},
			{
				accessorFn: (row) => `${row.firstName} ${row.lastName}`,
				id: "fullName",
				header: "Full Name",
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				// filterFn: fuzzyFilter,
				// aggregatedCell
				sortingFn: fuzzySort,
				...getFilterFn("string_multiple"),
			},

			{
				accessorKey: "createdAt",
				header: () => "Created At",
				footer: (props) => props.column.id,
				cell: (info) => info.getValue<Date>().toTemporalInstant().toJSON(),
				...getFilterFn("date_single"),
			},

			{
				accessorKey: "age",
				header: () => "Age",
				footer: (props) => props.column.id,
				...getFilterFn("number_multiple"),
			},

			{
				accessorKey: "visits",
				header: () => <span>Visits</span>,
				footer: (props) => props.column.id,
				...getFilterFn("number_single"),
			},
			{
				accessorKey: "status",
				header: "Status",
				footer: (props) => props.column.id,
				...getFilterFn("string_multiple"),
			},
		],
		[],
	);

	return { columns };
}
