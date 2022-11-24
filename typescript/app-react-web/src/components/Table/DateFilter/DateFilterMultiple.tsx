import { useState } from "react";
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Group,
  Popover,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  Plus,
} from "tabler-icons-react";
import { Column } from "@tanstack/react-table";
import { DatePicker, DateRangePicker } from "@mantine/dates";
import { operatorsValuesAndLabels } from "./dateFilterMultipleFn.js";
import {
  FormValuesRowFilterMultiple,
  logicalOperators,
  OperationInputKey,
  Operations,
} from "../helpers.js";
import { FilterShell } from "../FilterShell.jsx";

type Props<T> = {
  column: Column<T, unknown>;
  // table: Table<T>;
};

type InputParam = OperationInputKey<Date>;

export const DateFilterMultiple = <T extends unknown>({ column }: Props<T>) => {
  const [opened, setOpened] = useState(false);

  const form = useForm<FormValuesRowFilterMultiple<Date>>({
    initialValues: {
      operations: [
        {
          logical: "and",
          operator: "between",
          filterValue: new Date(),
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

  const formFields = form.values.operations.map((item, index) => (
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
          sx={{ flex: 2 }}
        />
      }
      filter={
        form.values.operations[0].operator === "between" ? (
          <DateRangePicker
            placeholder="Pick dates range"
            {...form.getInputProps<InputParam>(
              `operations.${index}.filterValue`
            )}
            amountOfMonths={2}
          />
        ) : (
          <DatePicker
            icon={<CalendarIcon />}
            placeholder="Pick date"
            mb="sm"
            allowFreeInput={true}
            {...form.getInputProps<InputParam>(
              `operations.${index}.filterValue`
            )}
          />
        )
      }
      onAddNewFilter={() =>
        form.removeListItem<Operations>("operations", index)
      }
    />
  ));

  return (
    <Popover
      opened={opened}
      position="bottom"
      withArrow={true}
      shadow="md"
      trapFocus={true}
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
        <Box style={{ maxWidth: 500 }}>
          {formFields}

          <Group position="center" mt="md">
            <Button
              variant="subtle"
              onClick={() =>
                form.insertListItem<Operations>("operations", {
                  operator: "is_after",
                  logical: "and",
                  filterValue: new Date(),
                  key: randomId(),
                })
              }
              rightIcon={<Plus />}
            >
              Add Filter
            </Button>
          </Group>
          {/*
        <Text size="sm" weight={300} mt="md">
          Form values:
        </Text>
        <ScrollArea style={{ height: 200 }}>
          <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </ScrollArea> */}
        </Box>
        <Group position="apart">
          <Anchor component="button" variant="text" onClick={handleClear}>
            Clear
          </Anchor>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
