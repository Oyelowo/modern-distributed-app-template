import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Group,
  Popover,
  Radio,
  RadioGroup,
  Table,
  TextInput,
  Switch,
  Box,
  Text,
  Code,
  Select,
} from '@mantine/core';
import { useForm, formList } from '@mantine/form';
import { randomId } from '@mantine/hooks';
import { Trash } from 'tabler-icons-react';
import { useSetState } from '@mantine/hooks';
// import { BiFilterAlt as FilterIcon } from "react-icons/bi";
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column, Table as ReactTable } from '@tanstack/react-table';
import { FilterOperationNumber } from './helpers/numberFilter';
import { Person } from '../makeData';
import { Condition, FilterCompoundOperationNumber } from './helpers/compountFilter';

export const NumberFilterCompound = ({
  column,
  table,
}: {
  column: Column<Person, unknown>;
  table: ReactTable<Person>;
}) => {
  // const {
  //   column: { filterValue, setFilter },
  // } = column.getFilterValue();
  const filterValue: FilterCompoundOperationNumber =
    column.getFilterValue() as FilterCompoundOperationNumber;

  const setFilter = column.setFilterValue;
  // console.log('column.getFilterValue()', column.getFilterValue());
  // console.log('column.setFilterValue', column.setFilterValue);
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<FilterCompoundOperationNumber[]>([]);
  // const [value, setValue] = useState<string[]>([]);

  // const [state, setState] = useSetState<FilterCompoundOperationNumber>({ operator: 'contains', value: '' });
  const [state, setState] = useSetState<FilterCompoundOperationNumber>(
    filterValue ?? { operator: 'fuzzy', value: '' }
  );
  const form = useForm({
    initialValues: {
      // employees: formList([{ name: '', active: false, key: randomId() }]),
      operations: formList<Condition & {key: string}>([{ logical: "and", operator: "fuzzy", filter: 0, key: randomId() }]),
    },
  });
  const [operator, setOperator] = useState('');

  const handleClose = () => {
    // setState({ operator: 'contains', value: '' });
    setState(filterValue || { operator: 'fuzzy', value: '' });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    //  setState({ operator: 'fuzzy', value: '' });
    setOpened(false);
  };

  const handleApply = () => {
    const k: FilterCompoundOperationNumber = {
      conditions: form.values.operations,
      filterValue: Number(column.getFilterValue()),
    };
    setFilter(form.values.operations);
    //  setFilter(state);
    setOpened(false);
  };

  const fields = form.values.operations.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        label="Operator"
        {...form.getListInputProps('operations', index, 'logical')}
        data={['and', 'or']}
      />
      <Select
        label="Operator"
        {...form.getListInputProps('operations', index, 'operator')}
        data={getRadios()}
      />
      <TextInput
        placeholder="John Doe"
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('operations', index, 'filter')}
      />
      {/* <Switch label="Active" {...form.getListInputProps('operations', index, 'active')} /> */}
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
          variant={filterValue ? 'light' : 'hover'}
          color={filterValue ? 'blue' : 'gray'}
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
        {fields.length > 0 ? (
          <Group mb="xs">
            <Text weight={500} size="sm" sx={{ flex: 1 }}>
              Name
            </Text>
            <Text weight={500} size="sm" pr={90}>
              Status
            </Text>
          </Group>
        ) : (
          <Text color="dimmed" align="center">
            No one here...
          </Text>
        )}

        {fields}

        <Group position="center" mt="md">
          <Button
            onClick={() =>
              form.addListItem('operations', {
                operator: "eq",
                logical: "and",
                filter: 0,
                key: randomId(),
              })
            }
          >
            Add+
          </Button>
        </Group>

        <Text size="sm" weight={500} mt="md">
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </Box>
      <Group position="apart">
        <Anchor component="button" color="gray" onClick={handleClear}>
          Clear
        </Anchor>
        <Button onClick={handleApply}>Apply</Button>
      </Group>
      {/* <Demo /> */}
    </Popover>
  );
};

function getRadios() {
  const stringOperations: Array<{
    value: FilterOperationNumber['operator'];
    label: string;
  }> = [
    {
      value: 'eq',
      label: 'Equals',
    },
    {
      value: 'gt',
      label: 'Greater than',
    },
    {
      value: 'gt_or_eq',
      label: 'Greate than or Equals',
    },
    {
      value: 'lt',
      label: 'Less than',
    },
    {
      value: 'lt_or_eq',
      label: 'Less than or equal',
    },
    {
      value: 'not_eq',
      label: 'Not equal',
    },
    {
      value: 'fuzzy',
      label: 'Fuzzy',
    },
  ];
  return stringOperations;
}

/* 

Logical
and_or => "and" | "or"

Operators:
  Number:
  String:
  Date:

Value

interface Searcher {
  logical: Logical | null,
  primitives: Operators;
  value: Date
}

*/

function Demo({ column, table }: { column: Column<Person, unknown>; table: ReactTable<Person> }) {
  const form = useForm({
    initialValues: {
      // employees: formList([{ name: '', active: false, key: randomId() }]),
      operations: formList([{ logical: '', operator: '', filter: '', key: randomId() }]),
    },
  });
  const [operator, setOperator] = useState('');

  const fields = form.values.operations.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        label="Operator"
        {...form.getListInputProps('operations', index, 'logical')}
        data={['and', 'or']}
      />
      <Select
        label="Operator"
        {...form.getListInputProps('operations', index, 'operator')}
        data={getRadios()}
      />
      <TextInput
        placeholder="John Doe"
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('operations', index, 'filter')}
      />
      {/* <Switch label="Active" {...form.getListInputProps('operations', index, 'active')} /> */}
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
    <Box sx={{ maxWidth: 500 }} mx="auto">
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text weight={500} size="sm" sx={{ flex: 1 }}>
            Name
          </Text>
          <Text weight={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text color="dimmed" align="center">
          No one here...
        </Text>
      )}

      {fields}

      <Group position="center" mt="md">
        <Button
          onClick={() =>
            form.addListItem('operations', {
              operator: '',
              logical: '',
              filter: '',
              key: randomId(),
            })
          }
        >
          Add+
        </Button>
      </Group>

      <Text size="sm" weight={500} mt="md">
        Form values:
      </Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </Box>
  );
}
