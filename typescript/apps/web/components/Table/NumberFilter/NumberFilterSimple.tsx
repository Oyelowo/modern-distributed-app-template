import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Group,
  Popover,
  Radio,
  RadioGroup,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
// import { FilterConditionNumberSimple } from './shared';
import { operatorsValuesAndLabels } from './numberFilterCompoundFn';
import { RowCustom } from '../helpers';

type Props = {
  column: Column<any, unknown>;
  // table: Table<unknown>;
};

export const NumberFilterSimple = ({ column }: Props) => {
  const form = useForm<Pick<RowCustom, 'filterValue' | 'operator'>>({
    initialValues: {
      filterValue: null,
      operator: 'fuzzy',
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
      // zIndex={10000}
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
      <TextInput
        placeholder={`Min(${column.getFacetedMinMaxValues()?.[0]}) Max(${
          column.getFacetedMinMaxValues()?.[1]
        })`}
        mb="sm"
        data-autoFocus
        {...form.getInputProps('filterValue')}
      />
      <Group position="apart">
        <Anchor component="button" color="gray" onClick={handleClear}>
          Clear
        </Anchor>
        <Button onClick={handleApply}>Apply</Button>
      </Group>
    </Popover>
  );
};
