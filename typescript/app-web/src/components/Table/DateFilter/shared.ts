import { Temporal } from "@js-temporal/polyfill";
import { rankItem } from "@tanstack/match-sorter-utils";
// import isBetween from "dayjs/plugin/isBetween";
// import dayjs from "dayjs";
import { RowDate } from "../helpers.js";

// dayjs.extend(isBetween);
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

const isSameInstant = ({
	instant,
	instantToCompare,
}: { instant: Temporal.Instant; instantToCompare: Temporal.Instant }) =>
	Temporal.Instant.compare(instant, instantToCompare) === 0;
const isAfterInstant = ({
	instant,
	instantToCompare,
}: { instant: Temporal.Instant; instantToCompare: Temporal.Instant }) =>
	Temporal.Instant.compare(instant, instantToCompare) >= 0;
const isBeforeInstant = ({
	instant,
	instantToCompare,
}: { instant: Temporal.Instant; instantToCompare: Temporal.Instant }) =>
	Temporal.Instant.compare(instant, instantToCompare) <= 0;

function isBetweenInstant(
	instant: Temporal.Instant,
	{ minInstant, maxInstant }: {
		minInstant: Temporal.Instant;
		maxInstant: Temporal.Instant;
	},
) {
	const isAfterMin = isAfterInstant({ instant, instantToCompare: minInstant });
	const isBeforeMax = isBeforeInstant({
		instant,
		instantToCompare: maxInstant,
	});
	return isAfterMin && isBeforeMax;
}

export const filterDateRow = ({
	rowValue,
	filterValue,
	operator,
	addMeta,
}: RowDate): boolean => {
	if (!filterValue) {
		return true;
	}

	// if it's a date range
	if (Array.isArray(filterValue)) {
		const [minInstant, maxInstant] = filterValue;
		return isBetweenInstant(rowValue, { minInstant, maxInstant });
	}

	const isSameDay = isSameInstant({
		instant: rowValue,
		instantToCompare: filterValue,
	});
	const isAfter = isAfterInstant({
		instant: rowValue,
		instantToCompare: filterValue,
	});
	const isBefore = isBeforeInstant({
		instant: rowValue,
		instantToCompare: filterValue,
	});

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
