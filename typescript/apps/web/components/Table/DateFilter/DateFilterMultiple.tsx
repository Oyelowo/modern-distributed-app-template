import { useState } from 'react';
import { ActionIcon, Anchor, Button, Group, Popover, Box, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Filter as FilterIcon, Calendar as CalendarIcon, Plus } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { operatorsValuesAndLabels } from './dateFilterMultipleFn';
import { logicalOperators, FormValuesRowFilterMultiple } from '../helpers';
import { FilterShell } from '../FilterShell';

type Props<T> = {
  column: Column<T, unknown>;
  // table: Table<T>;
};

export const DateFilterMultiple = <T extends unknown>({ column }: Props<T>) => {
  const [opened, setOpened] = useState(false);

  const form = useForm<FormValuesRowFilterMultiple<Date>>({
    initialValues: {
      operations: [
        {
          logical: 'and',
          operator: 'between',
          filterValue: new Date(),
          key: randomId(),
        },
      ],
    },
  });

  const handleClose = () => {
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

  const getOperationsInputProps = (
    index: number,
    field: keyof typeof form.values.operations[0]
  ) => {
    const operations: keyof typeof form.values = 'operations';
    return form.getInputProps(`${operations}.${index}.${field}`);
  };

  const fields = form.values.operations.map((item, index) => (
    <FilterShell
      key={item.key}
      showLogicalSelector={index !== 0}
      logicals={<Select {...getOperationsInputProps(index, 'logical')} data={logicalOperators} />}
      operator={
        <Select
          placeholder="Operator"
          {...getOperationsInputProps(index, 'operator')}
          data={operatorsValuesAndLabels}
          sx={{ flex: 2 }}
        />
      }
      filter={
        form.values.operations[0].operator === 'between' ? (
          <DateRangePicker
            placeholder="Pick dates range"
            {...getOperationsInputProps(index, 'filterValue')}
            amountOfMonths={2}
          />
        ) : (
          <DatePicker
            icon={<CalendarIcon />}
            placeholder="Pick date"
            mb="sm"
            allowFreeInput
            {...getOperationsInputProps(index, 'filterValue')}
          />
        )
      }
      onAddNewFilter={() => form.removeListItem('operations', index)}
    />
  ));

  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon
          variant={column.getFilterValue() ? 'light' : 'transparent'}
          color={column.getFilterValue() ? 'blue' : 'gray'}
          onClick={() => setOpened((o) => !o)}
        >
          <FilterIcon />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Box style={{ maxWidth: 600 }}>
          {fields}

          <Group position="center" mt="md">
            <Button
              variant="subtle"
              onClick={() =>
                form.insertListItem('operations', {
                  operator: 'is_after',
                  logical: 'and',
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
          <Anchor component="button" color="gray" onClick={handleClear}>
            Clear
          </Anchor>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
