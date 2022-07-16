import { RowNumber } from './../helpers';
import { rankItem } from '@tanstack/match-sorter-utils';

export const filterNumBySingleCondition = ({
  rowValueType,
  rowValue,
  filterValue,
  operator,
  addMeta,
}: RowNumber) => {
  if (!filterValue) {
    return true;
  }

  switch (operator) {
    case 'eq':
      return rowValue === filterValue;

    case 'not_eq':
      return rowValue !== filterValue;
    case 'gt':
      return rowValue > filterValue;
    case 'gt_or_eq':
      return rowValue >= filterValue;

    case 'lt':
      return rowValue < filterValue;

    case 'lt_or_eq':
      return rowValue <= filterValue;

    default: {
      // Rank the item
      const itemRank = rankItem(rowValue, String(filterValue));

      // Store the itemRank info
      addMeta({
        itemRank,
      });

      // Return if the item should be filtered in/out
      return itemRank.passed;
    }
  }
};
