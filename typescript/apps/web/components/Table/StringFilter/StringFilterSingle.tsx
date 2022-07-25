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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { useUniqueColumnValues } from './shared';
import { operatorsValuesAndLabels } from './stringFilterMultipleFn';
import { FilterSingleProps } from '../helpers';

type Props<T extends unknown> = {
  column: Column<T, unknown>;
  // table: Table<unknown>;
};

export const StringFilterSingle = <T extends unknown>({ column }: Props<T>) => {
  const form = useForm<FilterSingleProps<string>>({
    initialValues: {
      filterValue: '',
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

  //  opened={opened}
  //     onClose={handleClose}
  //     onClick={(e) => e.stopPropagation()}
  //     position="bottom"
  //     transition="scale-y"

  return (
    <Popover>
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
        <Radio.Group
          description="Select your option"
          orientation="vertical"
          size="sm"
          {...form.getInputProps('operator')}
        >
          {operatorsValuesAndLabels.map(({ value, label }) => (
            <Radio key={value} value={value} label={label} />
          ))}
        </Radio.Group>
        <Divider my="sm" />

        <Autocomplete
          mb="sm"
          placeholder={`Filter.. (${column.getFacetedUniqueValues().size})`}
          data={sortedUniqueValues}
          {...form.getInputProps('filterValue')}
        />

        <Group position="apart" mt="lg">
          <Anchor component="button" color="gray" onClick={handleClear}>
            Clear
          </Anchor>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
