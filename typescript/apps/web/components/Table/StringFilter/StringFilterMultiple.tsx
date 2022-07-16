import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Group,
  Popover,
  Box,
  Select,
  Autocomplete,
} from '@mantine/core';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Filter as FilterIcon, Plus } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { useUniqueColumnValues } from './shared';
import { operatorsValuesAndLabels } from './stringFilterMultipleFn';
import { RowFilterMultipleForm, logicalOperators } from '../helpers';
import { FilterShell } from '../FilterShell';

type Props<T> = {
  column: Column<T, unknown>;
  // table: Table<T>;
};

export const StringFilterMultiple = <T extends unknown>({ column }: Props<T>) => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      operations: formList<RowFilterMultipleForm<string>>([
        { logical: 'and', operator: 'fuzzy', filterValue: '', key: randomId() },
      ]),
    },
  });

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
        />
      }
      filter={
        <Autocomplete
          placeholder={`Filter.. (${column.getFacetedUniqueValues().size})`}
          data={sortedUniqueValues}
          {...form.getListInputProps('operations', index, 'filterValue')}
        />
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
      <Box sx={{ maxWidth: 600 }} mx="auto">
        {fields}

        <Group position="center" mt="md">
          <Button
            variant="subtle"
            onClick={() =>
              form.addListItem('operations', {
                operator: 'contains',
                logical: 'and',
                filterValue: '',
                key: randomId(),
              })
            }
            rightIcon={<Plus />}
          >
            Add Filter
          </Button>
        </Group>

        {/* <Text size="sm" weight={500} mt="md">
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code> */}
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
