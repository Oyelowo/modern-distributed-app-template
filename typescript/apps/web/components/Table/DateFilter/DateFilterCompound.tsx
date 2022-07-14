import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Popover,
  Box,
  Text,
  Code,
  Select,
  ScrollArea,
} from '@mantine/core';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Trash } from 'tabler-icons-react';
import { Filter as FilterIcon, Calendar as CalendarIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { FilterConditionDateCompound } from './shared';
import { operatorsValuesAndLabels } from './dateFilterCompoundFn';
import { DatePicker, DateRangePicker } from '@mantine/dates';
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
    <Group key={item.key} mt="xs">
      {index !== 0 ? (
        <Select
          label="Operator"
          {...form.getListInputProps('operations', index, 'logical')}
          data={logicalOperators}
          sx={{ flex: 0.9 }}
        />
      ) : (
        <Select
          rightSection={<></>}
          // styles={{ rightSection: { pointerEvents: 'none' } }}
          value={null}
          data={[]}
          disabled
          sx={{ flex: 0.9 }}
        />
      )}

      <Select
        label="Operator"
        {...form.getListInputProps('operations', index, 'operator')}
        data={operatorsValuesAndLabels}
        sx={{ flex: 2 }}
      />

      {form.getListInputProps('operations', index, 'operator').value === 'between' ? (
        <DateRangePicker
          label="Book hotel"
          placeholder="Pick dates range"
          {...form.getListInputProps('operations', index, 'filter')}
          amountOfMonths={2}
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

      <ActionIcon
        color="red"
        variant="hover"
        onClick={() => form.removeListItem('operations', index)}
      >
        <Trash size={16} />
      </ActionIcon>
    </Group>
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
      // zIndex={10000}
    >
      <Box sx={{ maxWidth: 500 }} mx="auto">
        {fields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('operations', {
                operator: 'fuzzy',
                logical: 'and',
                filter: null,
                key: randomId(),
              })
            }
          >
            Add+
          </Button>
        </Group>

        <Text size="sm" weight={300} mt="md">
          Form values:
        </Text>
        <ScrollArea style={{ height: 200 }}>
          <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </ScrollArea>
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
