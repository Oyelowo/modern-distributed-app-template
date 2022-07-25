import { useState } from 'react';
import { ActionIcon, Anchor, Box, Button, Divider, Group, Popover, Radio } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Filter as FilterIcon, Calendar as CalendarIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { operatorsValuesAndLabels } from './dateFilterMultipleFn';
import { FilterSingleProps } from '../helpers';

export const DateFilterSingle = <T extends unknown>({ column }: { column: Column<T, unknown> }) => {
  const form = useForm<FilterSingleProps<Date>>({
    initialValues: {
      filterValue: new Date(),
      operator: 'between',
    },
  });
  const [opened, setOpened] = useState(false);
  type InputParams = keyof typeof form.values;

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
    column.setFilterValue(form.values);
    setOpened(false);
  };

  return (
    <Popover opened={opened} onChange={setOpened} trapFocus position="bottom" withArrow shadow="md">
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
        <Box sx={{ maxWidth: 500 }} mx="auto">
          <Radio.Group
            description="Select your option"
            orientation="vertical"
            size="sm"
            {...form.getInputProps<InputParams>('operator')}
          >
            {operatorsValuesAndLabels.map(({ value, label }) => (
              <Radio key={value} value={value} label={label} />
            ))}
          </Radio.Group>
          <Divider my="sm" />

          {form.getInputProps('operator').value === 'between' ? (
            <DateRangePicker
              label="Book hotel"
              placeholder="Pick dates range"
              {...form.getInputProps('filterValue')}
              amountOfMonths={2}
            />
          ) : (
            <DatePicker
              icon={<CalendarIcon />}
              placeholder="Pick date"
              mb="sm"
              allowFreeInput
              {...form.getInputProps('filterValue')}
            />
          )}
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
