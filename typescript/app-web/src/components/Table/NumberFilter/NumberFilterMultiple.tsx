import { useState } from "react";
import {
	ActionIcon,
	Anchor,
	Box,
	Button,
	Group,
	NumberInput,
	Popover,
	Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Filter as FilterIcon, Plus } from "tabler-icons-react";
import { Column } from "@tanstack/react-table";
import { operatorsValuesAndLabels } from "./numberFilterMultipleFn.js";
import {
	FormValuesRowFilterMultiple,
	logicalOperators,
	OperationInputKey,
	Operations,
} from "../helpers.js";
import { FilterShell } from "../FilterShell.js";

type Props = {
	column: Column<any, unknown>;
	// table: Table<Person>;
};

type InputParam = OperationInputKey<number>;

export const NumberFilterMultiple = ({ column }: Props) => {
	const [opened, setOpened] = useState(false);
	const form = useForm<FormValuesRowFilterMultiple<number>>({
		initialValues: {
			operations: [
				{
					logical: "and",
					operator: "fuzzy",
					filterValue: 0,
					key: randomId(),
				},
			],
		},
	});

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
					sx={{ flex: 0.9 }}
				/>
			}
			operator={
				<Select
					{...form.getInputProps<InputParam>(`operations.${index}.operator`)}
					data={operatorsValuesAndLabels}
				/>
			}
			filter={
				<NumberInput
					placeholder={`Min(${column.getFacetedMinMaxValues()?.[0]}) Max(${
						column.getFacetedMinMaxValues()?.[1]
					})`}
					required
					{...form.getInputProps<InputParam>(`operations.${index}.filterValue`)}
					stepHoldDelay={500}
					stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
				/>
			}
			onAddNewFilter={() => form.removeListItem("operations", index)}
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
					color={column.getFilterValue() ? "blue" : "gray"}
					onClick={() => setOpened((o) => !o)}
				>
					<FilterIcon />
				</ActionIcon>
			</Popover.Target>

			<Popover.Dropdown>
				<Box sx={{ maxWidth: 500 }} mx="auto">
					{fields}

					<Group position="center" mt="md">
						<Button
							variant="subtle"
							onClick={() =>
								form.insertListItem<Operations>("operations", {
									operator: "eq",
									logical: "and",
									filterValue: 0,
									key: randomId(),
								})
							}
							rightIcon={<Plus />}
						>
							Add
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
