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
  Table,
  TextInput,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
// import { BiFilterAlt as FilterIcon } from "react-icons/bi";
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column, Table as ReactTable } from '@tanstack/react-table';
import { FilterOperationString } from './helpers/stringFilter';

const StringFilter = ({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) => {
  // const {
  //   column: { filterValue, setFilter },
  // } = column.getFilterValue();
  const filterValue: FilterOperationString = column.getFilterValue() as FilterOperationString;
  const setFilter = column.setFilterValue;
  // console.log('column.getFilterValue()', column.getFilterValue());
  // console.log('column.setFilterValue', column.setFilterValue);
  const [opened, setOpened] = useState(false);
  // const [state, setState] = useSetState<FilterOperationString>({ operator: 'contains', value: '' });
  const [state, setState] = useSetState(filterValue || { operator: 'contains', value: '' });

  const handleClose = () => {
    // setState({ operator: 'contains', value: '' });
    setState(filterValue || { operator: 'contains', value: '' });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: 'contains', value: '' });
    setOpened(false);
  };

  const handleApply = () => {
    setFilter(state);
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
        // variant="vertical"
        size="sm"
        value={state.operator}
        onChange={(o: FilterOperationString['operator']) => setState({ operator: o })}
      >
        {getRadios().map(({ operator, name }) => (
          <Radio value={operator} label={name} />
        ))}

      </RadioGroup>
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

export default StringFilter;

function getRadios() {
  const stringOperations: Array<{
    operator: FilterOperationString['operator'];
    name: string;
  }> = [
    {
      operator: 'contains',
      name: 'Contains',
    },
    {
      operator: 'not_contain',
      name: 'Does not Contain',
    },
    {
      operator: 'starts_with',
      name: 'Starts with',
    },
    {
      operator: 'ends_with',
      name: 'Ends with',
    },
    {
      operator: 'equals',
      name: 'Equals',
    },
    {
      operator: 'not_equal',
      name: 'Not equal',
    },
  ];
  return stringOperations;
}
