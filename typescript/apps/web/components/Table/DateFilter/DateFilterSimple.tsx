import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Popover,
  Radio,
  RadioGroup,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Filter as FilterIcon, Calendar as CalendarIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { operatorsValuesAndLabels } from './dateFilterCompoundFn';
import { FilterSingleProps } from '../helpers';

export const DateFilterSimple = <T extends unknown>({ column }: { column: Column<T, unknown> }) => {
  const form = useForm<FilterSingleProps<Date>>({
    initialValues: {
      filterValue: null,
      operator: 'between',
    },
  });
  const [opened, setOpened] = useState(false);

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
      <Box sx={{ maxWidth: 500 }} mx="auto">
        <RadioGroup
          description="Select your option"
          orientation="vertical"
          size="sm"
          {...form.getInputProps('operator')}
        >
          {operatorsValuesAndLabels.map(({ value, label }) => (
            <Radio key={value} value={value} label={label} />
          ))}
        </RadioGroup>
        <Divider my="sm" />

        {form.getInputProps('operator').value === 'between' ? (
          <DateRangePicker
            label="Book hotel"
            placeholder="Pick dates range"
            {...form.getInputProps('filterValue')}
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
    </Popover>
  );
};
