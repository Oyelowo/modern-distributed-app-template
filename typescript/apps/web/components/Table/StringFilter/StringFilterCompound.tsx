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
  Grid,
  Divider,
} from '@mantine/core';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Trash, Filter as FilterIcon, Plus } from 'tabler-icons-react';
import { Column } from '@tanstack/react-table';
import { FilterConditionStringCompound, useUniqueColumnValues } from './shared';
import { operatorsValuesAndLabels } from './stringFilterCompoundFn';
import { logicalOperators } from '../helpers';

type Props<T> = {
  column: Column<T, unknown>;
  // table: Table<T>;
};

export const StringFilterCompound = <T extends unknown>({ column }: Props<T>) => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      operations: formList<FilterConditionStringCompound & { key: string }>([
        { logical: null, operator: 'fuzzy', filter: '', key: randomId() },
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
          <Autocomplete
            placeholder={`Filter.. (${column.getFacetedUniqueValues().size})`}
            data={sortedUniqueValues}
            {...form.getListInputProps('operations', index, 'filter')}
          />
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
      <Box sx={{ maxWidth: 600 }} mx="auto">
        {fields}

        <Group position="center" mt="md">
          <Button
            variant="subtle"
            onClick={() =>
              form.addListItem('operations', {
                operator: 'contains',
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
