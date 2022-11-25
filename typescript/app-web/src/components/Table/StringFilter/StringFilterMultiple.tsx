import { useState } from "react";
import {
	ActionIcon,
	Anchor,
	Autocomplete,
	Box,
	Button,
	Group,
	Popover,
	Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Filter as FilterIcon, Plus } from "tabler-icons-react";
import { Column } from "@tanstack/react-table";
import { useUniqueColumnValues } from "./shared.js";
import { operatorsValuesAndLabels } from "./stringFilterMultipleFn.js";
import {
	FormValuesRowFilterMultiple,
	logicalOperators,
	OperationInputKey,
	Operations,
} from "../helpers.js";
import { FilterShell } from "../FilterShell.js";

type Props<T> = {
	column: Column<T, unknown>;
	// table: Table<T>;
};

type InputParam = OperationInputKey<string>;

export const StringFilterMultiple = <T extends unknown>({
	column,
}: Props<T>) => {
	const [opened, setOpened] = useState(false);
	const form = useForm<FormValuesRowFilterMultiple<string>>({
		initialValues: {
			operations: [
				{
					logical: "and",
					operator: "fuzzy",
					filterValue: "",
					key: randomId(),
				},
			],
		},
	});

	const sortedUniqueValues = useUniqueColumnValues(column);

	const _handleClose = () => {
		form.reset();
		setOpened(false);
	};

	const handleClear = () => {
		column.setFilterValue(undefined);
		form.reset();
		setOpened(false);
	};

	const handleApply = () => {
		column.setFilterValue(form.values.operations);
		setOpened(false);
	};

	const fields = form.values.operations.map((item, index) => (
		<FilterShell
			key={item.key}
			showLogicalSelector={index !== 0}
			logicals={
				<Select
					{...form.getInputProps<InputParam>(`operations.${index}.logical`)}
					data={logicalOperators}
				/>
			}
			operator={
				<Select
					placeholder="Operator"
					{...form.getInputProps<InputParam>(`operations.${index}.operator`)}
					data={operatorsValuesAndLabels}
				/>
			}
			filter={
				<Autocomplete
					placeholder={`Filter.. (${column.getFacetedUniqueValues().size})`}
					data={sortedUniqueValues}
					{...form.getInputProps<InputParam>(`operations.${index}.filterValue`)}
				/>
			}
			onAddNewFilter={() =>
				form.removeListItem<Operations>("operations", index)
			}
		/>
	));

	return (
		<Popover
			opened={opened}
			onChange={setOpened}
			trapFocus
			withArrow
			position="bottom"
			shadow="md"
			transition="scale-y"
		>
			<Popover.Target>
				<ActionIcon
					variant={column.getFilterValue() ? "light" : "subtle"}
					color={column.getFilterValue() ? "cyan" : "gray"}
					onClick={() => setOpened((o) => !o)}
				>
					<FilterIcon />
				</ActionIcon>
			</Popover.Target>

			<Popover.Dropdown>
				<Box sx={{ maxWidth: 600 }} mx="auto">
					{fields}

					<Group position="center" mt="md">
						<Button
							variant="subtle"
							onClick={() =>
								form.insertListItem("operations", {
									operator: "contains",
									logical: "and",
									filterValue: "",
									key: randomId(),
								})
							}
							rightIcon={<Plus />}
						>
							Add Filter
						</Button>
					</Group>

					{/* <Text size="sm" weight={500} mt="md">
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
				</Box>

				<Group position="apart">
					<Anchor component="button" color="gray" onClick={handleClear}>
						Clear
					</Anchor>
					<Button onClick={handleApply}>Apply</Button>
				</Group>
			</Popover.Dropdown>
		</Popover>
	);
};
