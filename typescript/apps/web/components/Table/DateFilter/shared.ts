import { RowDate } from './../helpers';
import { rankItem } from '@tanstack/match-sorter-utils';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';

dayjs.extend(isBetween);


export const filterDateRow = ({
  rowValue,
  filterValue,
  operator,
  addMeta,
}: RowDate): boolean => {
  if (!filterValue) {
    return true;
  }

  const rowValueDayjs = dayjs(rowValue);

  // if it's a date range
  if (Array.isArray(filterValue)) {
    const [minDate, maxDate] = filterValue;
    // Parameter 4 is a string with two characters; '[' means inclusive, '(' exclusive
    // '()' excludes start and end date (default)
    // '[]' includes start and end date
    // '[)' includes the start date but excludes the stop
    // Granuality offers the precision on start and end inclusive checks.
    // For example including the start date on day precision you should use 'day' as 3rd parameter.
    return rowValueDayjs.isBetween(minDate, maxDate, 'day', '[]');
  }

  const singleSearchFilterValue = dayjs(filterValue);
  const isSameDay = rowValueDayjs.isSame(singleSearchFilterValue, 'day');
  const isAfter = rowValueDayjs.isAfter(singleSearchFilterValue);
  const isBefore = rowValueDayjs.isBefore(singleSearchFilterValue);

  switch (operator) {
    case 'between':
      return isSameDay;
    case 'is_same':
      return isSameDay;

    case 'is_not_same':
      return !isSameDay;

    case 'is_after':
      return isAfter;

    case 'on_or_after':
      return isSameDay || isAfter;

    case 'is_before':
      return isBefore;

    case 'on_or_before':
      return isSameDay || isBefore;

    default: {
      // Rank the item
      const itemRank = rankItem(rowValue, String(singleSearchFilterValue));

      // Store the itemRank info
      addMeta({
        itemRank,
      });

      // Return if the item should be filtered in/out
      return itemRank.passed;
    }
  }
};
