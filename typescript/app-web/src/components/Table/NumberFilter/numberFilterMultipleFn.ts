import { FilterFn } from "@tanstack/react-table";
import {
	FilterMultipleProps,
	filterRowByMultipleFilters,
	RowNumber,
} from "../helpers.js";
import { filterNumberRow } from "./shared.js";

export const numberFilterMultipleFn: FilterFn<any> = (
	row,
	columnId,
	filters: FilterMultipleProps<number>[],
	addMeta,
) => {
	const rowValue = Number(row.getValue(columnId));

	return filterRowByMultipleFilters({
		onFilterRowValue: ({ operator, filterValue }) =>
			filterNumberRow({
				operator,
				filterValue,
				rowValue,
				addMeta,
			}),
		filterProps: filters,
	});
};

numberFilterMultipleFn.autoRemove = (val) => !val;

export const operatorsValuesAndLabels: Array<{
	value: RowNumber["operator"];
	label: string;
}> = [
	{
		value: "eq",
		label: "Equals",
	},
	{
		value: "gt",
		label: "Greater than",
	},
	{
		value: "gt_or_eq",
		label: "Greate than or Equals",
	},
	{
		value: "lt",
		label: "Less than",
	},
	{
		value: "lt_or_eq",
		label: "Less than or equal",
	},
	{
		value: "not_eq",
		label: "Not equal",
	},
	{
		value: "fuzzy",
		label: "Fuzzy",
	},
];
