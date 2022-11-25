import { ActionIcon, Divider, Grid } from "@mantine/core";
import { ReactElement } from "react";
import { Trash } from "tabler-icons-react";

type Props = {
  showLogicalSelector: boolean;
  logicals: ReactElement;
  operator: ReactElement;
  filter: ReactElement;
  onAddNewFilter: () => void;
};

export function FilterShell({
  showLogicalSelector,
  logicals,
  operator,
  filter,
  onAddNewFilter,
}: Props) {
  return (
    <>
      <Grid gutter="xs" mt="xs">
        <Grid.Col span={2}>{showLogicalSelector ? logicals : <div />}</Grid.Col>

        <Grid.Col span={4}>{operator}</Grid.Col>

        <Grid.Col span={5}>{filter}</Grid.Col>

        <Grid.Col span={1}>
          <ActionIcon color="red" variant="subtle" onClick={onAddNewFilter}>
            <Trash size={16} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <Divider mt="md" />
    </>
  );
}
