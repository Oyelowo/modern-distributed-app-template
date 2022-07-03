// title: Table
// desc: Table can be used to show a list of data in a table format.


type Title = "table";
type Component = Title;
type Modifier = "table-zebra" | "active" | "hover";

type Responsive = `${Title}-${"normal" | "compact"}`;

export type TableClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'table', desc: 'For <table> element' },
//   { type:'modifier', class: 'table-zebra', desc: 'For the active tab' },
//   { type:'modifier', class: 'active', desc: 'For <tr> to highlight current row' },
//   { type:'modifier', class: 'hover', desc: 'For <tr> to highlight current row on hover' },
//   { type:'responsive', class: 'table-normal', desc: 'Normal paddings' },
//   { type:'responsive', class: 'table-compact', desc: 'Compact paddings' },
// ]}"
