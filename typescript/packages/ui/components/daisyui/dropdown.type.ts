
// title: Dropdown
// desc: Dropdown can open a menu or any other element when the button is clicked.

import { PositionEdgesElement } from "./types";

type Component = "dropdown" | 'dropdown-content'
type Modifier = `dropdown-${PositionEdgesElement}` | "dropdown-hover" | "dropdown-open";

type Responsive = "";

export type TDropdown = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'dropdown', desc: 'Container element' },
//   { type:'component', class: 'dropdown-content', desc: 'Container for content' },
//   { type:'modifier', class: 'dropdown-end', desc: 'Aligns to end' },
//   { type:'modifier', class: 'dropdown-top', desc: 'Open from top' },
//   { type:'modifier', class: 'dropdown-left', desc: 'Open from left' },
//   { type:'modifier', class: 'dropdown-right', desc: 'Open from right' },
//   { type:'modifier', class: 'dropdown-hover', desc: 'Opens on hover too' },
//   { type:'modifier', class: 'dropdown-open', desc: 'Force open' },
// ]}"
