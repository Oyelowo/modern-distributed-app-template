import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Autocomplete,
  Button,
  Divider,
  Group,
  Popover,
  Radio,
  RadioGroup,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { FilterConditionStringSimple, useUniqueColumnValues } from './shared';
import { operatorsValuesAndLabels } from './stringFilterCompoundFn';

type Props<T extends unknown> = {
  column: Column<T, unknown>;
  // table: Table<unknown>;
};

export const StringFilterSimple = <T extends unknown>({ column }: Props<T>) => {
  const form = useForm<FilterConditionStringSimple>({
    initialValues: {
      filter: '',
      operator: 'fuzzy',
    },
  });
  const [opened, setOpened] = useState(false);

  const sortedUniqueValues = useUniqueColumnValues(column);

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
      {/*
      <TextInput
        placeholder="Filter By"
        mb="sm"
        // zIndex={100001}
        {...form.getInputProps('filter')}
      /> */}

      <Autocomplete
        // label="Filter By"
        placeholder={`Filter.. (${column.getFacetedUniqueValues().size})`}
        data={sortedUniqueValues}
        {...form.getInputProps('filter')}
      />
      <Group position="apart" mt="lg">
        <Anchor component="button" color="gray" onClick={handleClear}>
          Clear
        </Anchor>
        <Button onClick={handleApply}>Apply</Button>
      </Group>
    </Popover>
  );
};
