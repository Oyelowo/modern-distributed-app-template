import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Popover,
  Box,
  Select,
  Divider,
  Grid,
} from '@mantine/core';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Trash, Filter as FilterIcon, Calendar as CalendarIcon, Plus } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { FilterConditionDateCompound } from './shared';
import { operatorsValuesAndLabels } from './dateFilterCompoundFn';
import { logicalOperators } from '../helpers';

type Props<T> = {
  column: Column<T, unknown>;
  // table: Table<T>;
};

interface FormList extends FilterConditionDateCompound {
  key: string;
}

export const DateFilterCompound = <T extends unknown>({ column }: Props<T>) => {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      operations: formList<FormList>([
        {
          logical: null,
          operator: 'between',
          filter: new Date(),
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
    <>
      <Grid key={item.key} gutter="xs" mt="xs">
        <Grid.Col span={2}>
          {index !== 0 ? (
            <Select
              {...form.getListInputProps('operations', index, 'logical')}
              data={logicalOperators}
            />
          ) : (
            <div />
          )}
        </Grid.Col>

        <Grid.Col span={4}>
          <Select
            placeholder="Operator"
            {...form.getListInputProps('operations', index, 'operator')}
            data={operatorsValuesAndLabels}
            sx={{ flex: 2 }}
          />
        </Grid.Col>

        <Grid.Col span={5}>
          {form.getListInputProps('operations', index, 'operator').value === 'between' ? (
            <DateRangePicker
              placeholder="Pick dates range"
              {...form.getListInputProps('operations', index, 'filter')}
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
              {...form.getListInputProps('operations', index, 'filter')}
            />
          )}
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionIcon
            color="red"
            variant="hover"
            onClick={() => form.removeListItem('operations', index)}
          >
            <Trash size={16} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <Divider mt="md" />
    </>
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
                filter: null,
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
