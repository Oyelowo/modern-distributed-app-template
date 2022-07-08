// title: Select
// desc: Select is used to pick a value from a list of options.

import { ColorVariant, Size } from "./types";


type Title = "select";
type Component = Title | "form-control" | "label";
type Modifier = `${Title}-${ColorVariant | "bordered"}`;

type Responsive = `${Title}-${Size}`;

export type TSelect = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'form-control', desc: 'Container element' },
//   { type:'component', class: 'label', desc: 'For helper text' },
//   { type:'component', class: 'select', desc: 'For <select> element' },
//   { type:'modifier', class: 'select-bordered', desc: 'Adds border to select' },
//   { type:'modifier', class: 'select-ghost', desc: 'Adds ghost style to select' },
//   { type:'modifier', class: 'select-primary', desc: 'Adds `primary` color to select' },
//   { type:'modifier', class: 'select-secondary', desc: 'Adds `secondary` color to select' },
//   { type:'modifier', class: 'select-accent', desc: 'Adds `accent` color to select' },
//   { type:'modifier', class: 'select-info', desc: 'Adds `info` color to select' },
//   { type:'modifier', class: 'select-success', desc: 'Adds `success` color to select' },
//   { type:'modifier', class: 'select-warning', desc: 'Adds `warning` color to select' },
//   { type:'modifier', class: 'select-error', desc: 'Adds `error` color to select' },
//   { type:'responsive', class: 'select-lg', desc: 'Large size for select' },
//   { type:'responsive', class: 'select-md', desc: 'Medium (default) size for select' },
//   { type:'responsive', class: 'select-sm', desc: 'Small size for select' },
//   { type:'responsive', class: 'select-xs', desc: 'Extra small size for select' },
// ]}"
