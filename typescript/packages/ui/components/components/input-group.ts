// title: Input group
// desc: Input group puts an input next to a text or a button.

import { Size } from "../types";

type Title = "input-group";

type Component = Title
type Modifier = `${Title}-${Size | "vertical"}`;

type Responsive = "";

export type InputGroupClass = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'input-group', desc: 'Container for grouping elements' },
//   { type:'modifier', class: 'input-group-lg', desc: 'Large size for input-group wrapper' },
//   { type:'modifier', class: 'input-group-md', desc: 'Medium (default) size for input-group wrapper' },
//   { type:'modifier', class: 'input-group-sm', desc: 'Small size for input-group wrapper' },
//   { type:'modifier', class: 'input-group-xs', desc: 'Extra small size for input-group wrapper' },
//   { type:'modifier', class: 'input-group-vertical', desc: 'Vertical direction for input-group items' },
// ]}"

