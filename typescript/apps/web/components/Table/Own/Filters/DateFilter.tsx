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
import { DatePicker } from '@mantine/dates';
// import { BiFilterAlt as FilterIcon } from "react-icons/bi";
import { Filter as FilterIcon, Calendar as CalendarIcon } from 'tabler-icons-react';
import { Column, Table as ReactTable } from '@tanstack/react-table';
import { FilterOperationDate } from './helpers/dateFilter';
import { Person } from '../makeData';

const StringFilter = ({
  column,
  table,
}: {
  column: Column<Person, unknown>;
  table: ReactTable<Person>;
}) => {
  // const {
  //   column: { filterValue, setFilter },
  // } = column.getFilterValue();
  const filterValue: FilterOperationDate = column.getFilterValue() as FilterOperationDate;
  const setFilter = column.setFilterValue;
  // console.log('column.getFilterValue()', column.getFilterValue());
  // console.log('column.setFilterValue', column.setFilterValue);
  const [opened, setOpened] = useState(false);
  // const [state, setState] = useSetState<FilterOperationDate>({ operator: 'contains', value: '' });
  const [state, setState] = useSetState<FilterOperationDate>(
    filterValue || { operator: 'none', value: undefined }
  );

  const handleClose = () => {
    // setState({ operator: 'contains', value: '' });
    setState(filterValue || { operator: 'none', value: '' });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: 'none', value: undefined });
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
        orientation="vertical"
        size="sm"
        value={state.operator}
        onChange={(o: FilterOperationDate['operator']) => setState({ operator: o })}
      >
        {getRadios().map(({ operator, name }) => (
          <Radio key={operator} value={operator} label={name} />
        ))}
      </RadioGroup>
      <Divider my="sm" />
      {/* <TextInput
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
      <Divider my="sm" /> */}

      <DatePicker
        icon={<CalendarIcon />}
        placeholder="Pick date"
        mb="sm"
        // withSelect
        // zIndex={100001}
        withinPortal={false}
        value={state.value}
        onChange={(val) => setState({ value: val ?? undefined })}
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
    operator: FilterOperationDate['operator'];
    name: string;
  }> = [
    {
      operator: 'is_same',
      name: 'Same day',
    },
    {
      operator: 'is_after',
      name: 'Is after',
    },
    {
      operator: 'is_before',
      name: 'is before',
    },
    {
      operator: 'is_not_same',
      name: 'is not before',
    },
    {
      operator: 'on_or_after',
      name: 'On or after',
    },
    {
      operator: 'on_or_before',
      name: 'On or before',
    },
    // {
    //   operator: '',
    //   name: 'none',
    // },
  ];
  return stringOperations;
}
