import { rankItem } from "@tanstack/match-sorter-utils";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";
import { RowDate } from "../helpers.ts";

dayjs.extend(isBetween);
// declare module 'dayjs' {
//     //  isBetween(a: number) : boolean
//   isBetween(option: unknown, c: typeof dayjs.Dayjs, d: typeof dayjs)=> void
// // }
// declare namespace dayjs {
//   interface ConfigTypeMap {
//     default: string | number | Date | Dayjs | null | undefined
//   }

//   export type ConfigType = ConfigTypeMap[keyof ConfigTypeMap]
//   export interface FormatObject { locale?: string, format?: string, utc?: boolean }

//   export type OptionType = FormatObject | string | string[]
//   //  isBetween(a: number) : boolean
//   // isBetween(option: unknown, c: typeof dayjs.Dayjs, d: typeof dayjs)=> void
//   class Dayjs {

//     constructor(config?: ConfigType) { }

//     isAfter(date: ConfigType, unit?: OpUnitType): boolean
//   }
// }

export const filterDateRow = (
  { rowValue, filterValue, operator, addMeta }: RowDate,
): boolean => {
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
    // TODO: Figure out how to work with this type
    return (rowValueDayjs as any).isBetween(minDate, maxDate, "day", "[]");
  }

  const singleSearchFilterValue = dayjs(filterValue);
  const isSameDay = rowValueDayjs.isSame(singleSearchFilterValue, "day");
  const isAfter = rowValueDayjs.isAfter(singleSearchFilterValue);
  const isBefore = rowValueDayjs.isBefore(singleSearchFilterValue);

  switch (operator) {
    case "between":
      return isSameDay;
    case "is_same":
      return isSameDay;

    case "is_not_same":
      return !isSameDay;

    case "is_after":
      return isAfter;

    case "on_or_after":
      return isSameDay || isAfter;

    case "is_before":
      return isBefore;

    case "on_or_before":
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
