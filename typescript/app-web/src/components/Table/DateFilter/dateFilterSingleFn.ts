import { FilterFn } from "@tanstack/react-table";
import { FilterSingleProps, TemporalInstant } from "../helpers.js";
import { filterDateRow } from "./shared.js";

export const dateFilterSimpleFn: FilterFn<unknown> = (
	row,
	columnId,
	filter: FilterSingleProps<TemporalInstant>,
	addMeta,
) => {
	const { operator = "between", filterValue } = filter;
	if (!row.getValue<TemporalInstant>(columnId)) {
		throw new Error("Row does not exist");
	}
	const rowValue = row.getValue<TemporalInstant>(columnId);

	return filterDateRow({
		rowValue,
		filterValue,
		operator,
		addMeta,
	});
};

dateFilterSimpleFn.autoRemove = (val) => !val;
