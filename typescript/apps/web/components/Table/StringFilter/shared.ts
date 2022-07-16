import { RowString } from './../helpers';
import { rankItem } from '@tanstack/match-sorter-utils';
import { Column } from '@tanstack/react-table';
import { useMemo } from 'react';

export const filterStringRow = ({
  rowValue: rv,
  filterValue,
  operator,
  addMeta,
}: RowString) => {
  if (!filterValue) {
    return true;
  }
  const searchFilterValue = filterValue.toLocaleLowerCase();
  const rowValue = String(rv).toLocaleLowerCase();

  switch (operator) {
    case 'starts_with':
      return rowValue.startsWith(searchFilterValue);

    case 'ends_with':
      return rowValue.endsWith(searchFilterValue);

    case 'equals':
      return rowValue === searchFilterValue;

    case 'not_equal':
      return rowValue !== searchFilterValue;

    case 'contains':
      return rowValue.includes(searchFilterValue);

    case 'not_contain':
      return !rowValue.includes(searchFilterValue);

    default: {
      // Rank the item
      const itemRank = rankItem(rowValue, searchFilterValue);

      // Store the itemRank info
      addMeta({
        itemRank,
      });

      // Return if the item should be filtered in/out
      return itemRank.passed;
    }
  }
};

export function useUniqueColumnValues<T>(column: Column<T, unknown>) {
  const facetedUniqValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () => Array.from(facetedUniqValues.keys()).sort(),
    [facetedUniqValues]
  );

  return sortedUniqueValues;
}
