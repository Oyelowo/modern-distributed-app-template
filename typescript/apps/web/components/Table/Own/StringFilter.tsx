import { useMemo, useState } from 'react';
import { Popover, Text, Button, Image, ActionIcon } from '@mantine/core';
import { Filter as FilterIcon } from 'tabler-icons-react';
import { Column, Table } from '@tanstack/react-table';

export function StringFilter2({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const [opened, setOpened] = useState(false);
  //   The first row of a set of yet to be/unfiltered/prefiltered flattened rows of(rows can also have nested groups)
  // So, `getPreFilteredRowModel` flattens them all.
  //   This gets the first row and the value of the corresponding column.
  //   e.g if you're interested in value of row `0` of column.id -> firstName.
  //   column id is the id of the column e.g firstName
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  /* 
  //   The value in the input element used to filter the column. e.g
  // if you're filtering by firstName, the onChange input value is this value
  //   This can also be a complex value. e.g [number, number] if a column has min and
  // max input filter search values. Although, you'd likely be updating them separately
  // but you would have to use the same column.setFilterValue([number, number])
  // e.g2:  value={(columnFilterValue as [number, number])?.[0] ?? ''}
  // onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])} 
  */
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : // the unique values of the column data. e.g if a column has 3 "Oye"s, it will be {"Oye": 3}
          // so, the unique values by their frequencies/count, i.e: {"Oyelowo": 23, "Hali": 47}
          //   The below gets all the unique keys and sorts them
          Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  // console.log('column.id', column.id);
  //   console.log('table.getPreFilteredRowModel()', table.getPreFilteredRowModel());
  //   console.log('column.getFacetedUniqueValues()', column.getFacetedUniqueValues());
  //   console.log('firstValue', firstValue);
  //   console.log('sortedUniqueValues', sortedUniqueValues);
  // console.log('columnFilterValue', columnFilterValue);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      //   target={<Button onClick={() => setOpened((o) => !o)}>Toggle popover</Button>}
      target={
        <ActionIcon
          //   variant={filterValue ? 'light' : 'hover'}
          //   color={filterValue ? 'blue' : 'gray'}
          //   onClick={() => setOpened((o) => !o)}
          onClick={() => setOpened((o) => !o)}
        >
          <FilterIcon />
        </ActionIcon>
      }
      width={260}
      position="bottom"
      withArrow
    >
      <div style={{ display: 'flex' }}>
        <Image src="./logo.svg" width={30} height={30} sx={{ minWidth: 30 }} mr="md" />
        <Text size="sm">Thanks for stopping by and checking Mantine, you are awesome!</Text>
      </div>
    </Popover>
  );
}
