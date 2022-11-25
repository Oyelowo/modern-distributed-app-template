import { FilterFn } from "@tanstack/react-table";
import { filterNumberRow } from "./shared.js";
import { Person } from "../makeData.js";
import { FilterSingleProps } from "../helpers.js";

export const numberFilterSingleFn: FilterFn<Person> = (
	row,
	columnId,
	filter: FilterSingleProps<number>,
	addMeta,
) => {
	const { operator = "eq", filterValue } = filter;
	const rowValue = Number(row.getValue(columnId));

	return filterNumberRow({
		rowValue,
		filterValue: Number(filterValue),
		operator,
		addMeta,
	});
};
numberFilterSingleFn.autoRemove = (val) => !val;
