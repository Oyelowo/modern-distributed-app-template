import { rankItem } from "@tanstack/match-sorter-utils";
import { RowDate, TemporalInstant } from "../helpers.js";

const isSameInstant = ({
	instant,
	instantToCompare,
}: { instant: TemporalInstant; instantToCompare: TemporalInstant }) =>
	Temporal.Instant.compare(instant, instantToCompare) === 0;
const isAfterInstant = ({
	instant,
	instantToCompare,
}: { instant: TemporalInstant; instantToCompare: TemporalInstant }) =>
	Temporal.Instant.compare(instant, instantToCompare) >= 0;
const isBeforeInstant = ({
	instant,
	instantToCompare,
}: { instant: TemporalInstant; instantToCompare: TemporalInstant }) =>
	Temporal.Instant.compare(instant, instantToCompare) <= 0;

function isBetweenInstant(
	instant: TemporalInstant,
	{
		minInstant,
		maxInstant,
	}: {
		minInstant: TemporalInstant;
		maxInstant: TemporalInstant;
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
