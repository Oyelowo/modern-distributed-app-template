import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Group,
  Popover,
  Radio,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { operatorsValuesAndLabels } from './numberFilterMultipleFn';
import { RowNumber } from '../helpers';

type Props = {
  column: Column<any, unknown>;
  // table: Table<unknown>;
};

export const NumberFilterSingle = ({ column }: Props) => {
  const form = useForm<Pick<RowNumber, 'filterValue' | 'operator'>>({
    initialValues: {
      filterValue: 0,
      operator: 'fuzzy',
    },
  });
  type InputParam = keyof typeof form.values;

  const [opened, setOpened] = useState(false);

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
    column.setFilterValue(form.values);
    setOpened(false);
  };

  return (
    <Popover opened={opened} onChange={setOpened} trapFocus withArrow position="bottom" shadow="md">
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
        <TextInput
          placeholder={`Min(${column.getFacetedMinMaxValues()?.[0]}) Max(${
            column.getFacetedMinMaxValues()?.[1]
          })`}
          mb="sm"
          data-autofocus
          {...form.getInputProps<InputParam>('filterValue')}
        />
        <Group position="apart">
          <Anchor component="button" color="gray" onClick={handleClear}>
            Clear
          </Anchor>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Popover.Dropdown>
      s
    </Popover>
  );
};
