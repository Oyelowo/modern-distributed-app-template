// Logical
export type AndOr = "and" | "or";

// Operators:
// Number:
// String:
// Date:

// Value


type OperatorNumber = "gt" | "lt" | "eq" | "not_eq" | "gt_or_eq" | "lt_or_eq" | "fuzzy";
interface Searcher {
    logical: AndOr | null,
    primitives: OperatorNumber;
    value: Date
}

console.log("lowo")