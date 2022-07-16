import { useState } from 'react';
import { ActionIcon, Anchor, Button, Group, Popover, Box, Select } from '@mantine/core';
import { useForm, formList, FormList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Filter as FilterIcon, Calendar as CalendarIcon, Plus } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { operatorsValuesAndLabels } from './dateFilterCompoundFn';
import { FilterMultipleProps, FormListCustom, logicalOperators } from '../helpers';
import { FilterShell } from '../FilterShell';

type Props<T> = {
  column: Column<T, unknown>;
  // table: Table<T>;
};

export const DateFilterCompound = <T extends unknown>({ column }: Props<T>) => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      operations: formList<FormListCustom<Date>>([
        {
          logical: 'and',
          operator: 'between',
          filterValue: new Date(),
          key: randomId(),
        },
      ]),
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

  const fields = form.values.operations.map((item, index) => (
    <FilterShell
      key={item.key}
      showLogicalSelector={index !== 0}
      logicals={
        <Select
          {...form.getListInputProps('operations', index, 'logical')}
          data={logicalOperators}
        />
      }
      operator={
        <Select
          placeholder="Operator"
          {...form.getListInputProps('operations', index, 'operator')}
          data={operatorsValuesAndLabels}
          sx={{ flex: 2 }}
        />
      }
      filter={
        form.getListInputProps('operations', index, 'operator').value === 'between' ? (
          <DateRangePicker
            placeholder="Pick dates range"
            {...form.getListInputProps('operations', index, 'filterValue')}
            amountOfMonths={2}
            /*
          Popover listens for outside clicks with use-click-outside hook. This means that it is not possible to use elements that render overlays within Portal inside Popover. To use components like Autocomplete, Menu, DatePicker portal feature should be disabled for these components:
          */
            withinPortal={false}
          />
        ) : (
          <DatePicker
            icon={<CalendarIcon />}
            placeholder="Pick date"
            mb="sm"
            allowFreeInput
            withinPortal={false}
            {...form.getListInputProps('operations', index, 'filterValue')}
          />
        )
      }
      onAddNewFilter={() => form.removeListItem('operations', index)}
    />
  ));

  return (
    <Popover
      target={
        <ActionIcon
          variant={column.getFilterValue() ? 'light' : 'hover'}
          color={column.getFilterValue() ? 'blue' : 'gray'}
          onClick={() => setOpened((o) => !o)}
        >
          <FilterIcon />
        </ActionIcon>
      }
      opened={opened}
      onClose={handleClose}
      onClick={(e) => e.stopPropagation()}
      position="bottom"
      transition="scale-y"
    >
      <Box style={{ maxWidth: 600 }}>
        {fields}

        <Group position="center" mt="md">
          <Button
            variant="subtle"
            onClick={() =>
              form.addListItem('operations', {
                operator: 'is_after',
                logical: 'and',
                filterValue: null,
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
    </Popover>
  );
};
