import { useState } from "react";
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Group,
  NumberInput,
  Popover,
  Radio,
  RadioGroup
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { BiFilterAlt as FilterIcon } from "react-icons/bi";

const NumberFilter = (props) => {
  const {
    column: { filterValue, setFilter, filterOptions }
  } = props;
  const { min, max, step } = filterOptions || {};
  const [opened, setOpened] = useState(false);
  const [state, setState] = useSetState(
    filterValue || { operator: "cont", value: undefined }
  );

  const handleClose = () => {
    setState(filterValue || { operator: "cont", value: "" });
    setOpened(false);
  };

  const handleClear = () => {
    setFilter(undefined);
    setState({ operator: "cont", value: "" });
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
          variant={filterValue ? "light" : "hover"}
          color={filterValue ? "blue" : "gray"}
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
        variant="vertical"
        size="sm"
        value={state.operator}
        onChange={(o) => setState({ operator: o })}
      >
        <Radio value="eq">Equals</Radio>
        <Radio value="not_eq">Not equal</Radio>
        <Radio value="gt">Greater than</Radio>
        <Radio value="gteq">Greater than or equal</Radio>
        <Radio value="lt">Less than</Radio>
        <Radio value="lteq">Less than or equal</Radio>
      </RadioGroup>
      <Divider my="sm" />
      <NumberInput
        placeholder="Enter number"
        mb="sm"
        hideControls
        data-autoFocus
        min={min}
        max={max}
        step={step}
        value={state.value}
        onChange={(val) => setState({ value: val })}
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

export default NumberFilter;
