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
  const filterValue = column.getFilterValue();
  const setFilter = column.setFilterValue;
  // console.log('column.getFilterValue()', column.getFilterValue());
  // console.log('column.setFilterValue', column.setFilterValue);
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState({ operator: 'cont', value: '' });
  // const [state, setState] = useSetState(filterValue || { operator: 'cont', value: '' });

  const handleClose = () => {
    setState({ operator: 'cont', value: '' });
    // setState(filterValue || { operator: 'cont', value: '' });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: 'cont', value: '' });
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
      opened={true}
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
        onChange={(o) => setState({ operator: o })}
      >
        <Radio value="cont">Contains</Radio>
        <Radio value="not_cont">Does not contain</Radio>
        <Radio value="start">Starts with</Radio>
        <Radio value="end">Ends with</Radio>
        <Radio value="eq">Equals</Radio>
        <Radio value="not_eq">Not equal</Radio>
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
