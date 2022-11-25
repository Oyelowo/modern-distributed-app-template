import { Column } from "@tanstack/react-table";
import { ArrowsSort, SortAscending, SortDescending } from "tabler-icons-react";
import { Person } from "./makeData.js";
import { useStyles } from "./styles.js";

export function Sorter({ column }: { column: Column<Person, unknown> }) {
	const Sorted = ({ isAsc }: { isAsc: boolean }) =>
		isAsc ? <SortAscending /> : <SortDescending />;
	const { classes } = useStyles();

	if (!column.getCanSort()) return null;

	if (column.getIsSorted()) {
		return <Sorted isAsc={column.getIsSorted() === "asc"} />;
	}
	return <ArrowsSort className={classes.disableSortIcon} />;
}
