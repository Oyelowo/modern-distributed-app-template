import { FilterMeta, sortingFns, FilterFn, SortingFn } from '@tanstack/react-table';
import { rankItem, compareItems } from '@tanstack/match-sorter-utils';

export type OperatorLogical = 'and' | 'or';
export const logicalOperators: OperatorLogical[] = ['and', 'or'];

export type DateFilter = Date | [Date, Date];

type FilterValueType = number | string | DateFilter /* for date range */;

export type FilterConditionSimple<Operator extends string, Filter extends FilterValueType> = {
  /**  operator */
  operator: Operator;
  /**  The input value used that value is being filtered by */
  filter: Filter | null;
};

export type FilterConditionCompound<
  Operator extends string,
  Filter extends FilterValueType
> = FilterConditionSimple<Operator, Filter> & { logical: OperatorLogical | null };

export type AddMeta = (meta: FilterMeta) => void;
export type FilterPropsOld<Operator extends string, FilterType extends FilterValueType> = {
  /**  The row value that is being filtered against */
  rowValue: number | string | Date;
  condition: FilterConditionSimple<Operator, FilterType>;
  /**  For react query to add  metadata to do fuzzy search */
  addMeta: AddMeta;
};

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta): boolean => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export type RowString = {
  rowValue: string;
  operator:
    | 'contains'
    | 'not_contain'
    | 'starts_with'
    | 'ends_with'
    | 'equals'
    | 'not_equal'
    | 'fuzzy';

  filterValue: string;
  addMeta: AddMeta;
};

export type RowNumber = {
  rowValue: number;
  operator: 'gt' | 'lt' | 'eq' | 'not_eq' | 'gt_or_eq' | 'lt_or_eq' | 'fuzzy';
  filterValue: number;
  addMeta: AddMeta;
};

export type RowDate = {
  rowValue: Date;
  operator:
    | 'between'
    | 'is_same'
    | 'is_before'
    | 'is_after'
    | 'is_not_same'
    | 'on_or_before'
    | 'on_or_after'
    | 'fuzzy';

  filterValue: Date | [Date, Date];
  addMeta: AddMeta;
};

export type RowCustom = RowString | RowNumber | RowDate;

type RowValueType = RowCustom['rowValue'];

type ExtractRowProps<TRow extends RowValueType> = Extract<RowCustom, { rowValue: TRow }>;

type LogicalProp = {
  logical: OperatorLogical;
};

export type FilterSingleProps<TRow extends RowValueType> = Pick<
  ExtractRowProps<TRow>,
  'filterValue' | 'operator'
>;

export type FilterMultipleProps<TRow extends RowValueType> = FilterSingleProps<TRow> & LogicalProp;
export type RowFilterMultipleForm<TRow extends RowValueType> = FilterMultipleProps<TRow> & {
  key: string;
};

export type Operations = 'operations';
export type FormValuesRowFilterMultiple<TRow extends RowValueType> = Record<
  Operations,
  RowFilterMultipleForm<TRow>[]
>;

export type OperationInputKey<TRow extends RowValueType> =
  `${Operations}.${number}.${keyof RowFilterMultipleForm<TRow>}`;

type FilterMultipleFnProps<TRow extends RowValueType> = {
  filterProps: FilterMultipleProps<TRow>[];
  onFilterRowValue: (filterProps: FilterMultipleProps<TRow>) => boolean;
};

export function filterRowByMultipleFilters<TRow extends RowValueType>({
  filterProps,
  onFilterRowValue,
}: FilterMultipleFnProps<TRow>): boolean {
  //   Goes through the conditions list(the logical operator("and"/"or") and the number operators(">" | "<")) and calculates
  // the boolean value until it reaches the last.
  // This determines if a row should be filtered out or not
  // e.g [true, false, true, false] => false
  // e.g [true, true, true, true] => true
  const filterRowValue = (
    previousAggregatedFilter: boolean,
    currentFilteProps: FilterMultipleProps<TRow>
  ): boolean => {
    const currentFilter = onFilterRowValue(currentFilteProps);

    if (currentFilteProps.logical === 'and') {
      return previousAggregatedFilter && currentFilter;
    }

    if (currentFilteProps.logical === 'or') {
      return previousAggregatedFilter || currentFilter;
    }

    return currentFilter;
  };

  return filterProps.reduce(filterRowValue, true);
}
