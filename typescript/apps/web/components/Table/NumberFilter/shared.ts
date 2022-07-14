import { rankItem } from '@tanstack/match-sorter-utils';
import { FilterConditionSimple, FilterConditionCompound, FilterProps } from '../helpers';

export type OperatorNumber = 'gt' | 'lt' | 'eq' | 'not_eq' | 'gt_or_eq' | 'lt_or_eq' | 'fuzzy';

export type FilterConditionNumberSimple = FilterConditionSimple<OperatorNumber, number>;
export type FilterConditionNumberCompound = FilterConditionCompound<OperatorNumber, number>;

export const filterNumBySingleCondition = ({
  rowValue,
  condition,
  addMeta,
}: FilterProps<OperatorNumber, number>) => {
  const searchFilterValue = condition.filter ?? true;

  switch (condition.operator) {
    case 'eq':
      return rowValue === searchFilterValue;

    case 'not_eq':
      return rowValue !== searchFilterValue;
    case 'gt':
      return rowValue > searchFilterValue;
    case 'gt_or_eq':
      return rowValue >= searchFilterValue;

    case 'lt':
      return rowValue < searchFilterValue;

    case 'lt_or_eq':
      return rowValue <= searchFilterValue;

    default: {
      // Rank the item
      const itemRank = rankItem(rowValue, String(searchFilterValue));

      // Store the itemRank info
      addMeta({
        itemRank,
      });

      // Return if the item should be filtered in/out
      return itemRank.passed;
    }
  }
};
