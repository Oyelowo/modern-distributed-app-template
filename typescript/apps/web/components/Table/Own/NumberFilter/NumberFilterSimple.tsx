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
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
// import { BiFilterAlt as FilterIcon } from "react-icons/bi";
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column, Table as ReactTable } from '@tanstack/react-table';
import { FilterConditionNumberSimple } from './shared';
import { Person } from '../makeData';

const NumberFilterSimple = ({
  column,
  table,
}: {
  column: Column<Person, unknown>;
  table: ReactTable<Person>;
}) => {
  const filterValue: FilterConditionNumberSimple =
    column.getFilterValue() as FilterConditionNumberSimple;
  const setFilter = column.setFilterValue;
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState<FilterConditionNumberSimple>(
    filterValue ?? { operator: 'fuzzy', value: '' }
  );

  const handleClose = () => {
    // setState({ operator: 'contains', value: '' });
    setState(filterValue || { operator: 'fuzzy', value: '' });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: 'fuzzy', filter: null });
    setOpened(false);
  };

  const handleApply = () => {
    setFilter(state);
    column.setFilterValue(state);
    setOpened(false);
  };

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
      <RadioGroup
        description="Select your option"
        orientation="vertical"
        size="sm"
        value={state.operator}
        onChange={(o: FilterConditionNumberSimple['operator']) => setState({ operator: o })}
      >
        {getRadios().map(({ operator, name }) => (
          <Radio key={operator} value={operator} label={name} />
        ))}
      </RadioGroup>

      {/* <CheckboxGroup
        description="Select your option"
        orientation="vertical"
        size="sm"
        value={state.operator}
        onChange={(o: FilterConditionNumberSimple['operator'][]) =>
          setValue((prev) => [...prev, { operator: o }])
        }
        value={value}
        // onChange={setValue}
      >
        {getRadios().map(({ operator, name }) => (
          <Checkbox key={operator} value={operator} label={name} />
        ))}
      </CheckboxGroup> */}
      <Divider my="sm" />
      <TextInput
        placeholder="Enter text"
        mb="sm"
        data-autoFocus
        value={state.value}
        onChange={(e) => setState({ value: e.target.value })}
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

export default NumberFilterSimple;

function getRadios() {
  const stringOperations: Array<{
    operator: FilterConditionNumberSimple['operator'];
    name: string;
  }> = [
    {
      operator: 'eq',
      name: 'Equals',
    },
    {
      operator: 'gt',
      name: 'Greater than',
    },
    {
      operator: 'gt_or_eq',
      name: 'Greate than or Equals',
    },
    {
      operator: 'lt',
      name: 'Less than',
    },
    {
      operator: 'lt_or_eq',
      name: 'Less than or equal',
    },
    {
      operator: 'not_eq',
      name: 'Not equal',
    },
    {
      operator: 'fuzzy',
      name: 'Fuzzy',
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
