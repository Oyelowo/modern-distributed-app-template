// title: Text Input
// desc: Text Input is a simple input field.

import { ColorVariant, Size } from "./types";

type Title = "input";
type Component = Title;
type Modifier = `${Title}-${ColorVariant | "bordered"}`;

type Responsive = `${Title}-${Size}`;

export type TInput = Component | Modifier | Responsive;



// data="{[
//   { type:'component', class: 'form-control', desc: 'Container element' },
//   { type:'component', class: 'label', desc: 'For helper text' },
//   { type:'component', class: 'input', desc: 'For <input> element' },
//   { type:'modifier', class: 'input-bordered', desc: 'Adds border to input' },
//   { type:'modifier', class: 'input-ghost', desc: 'Adds ghost style to input' },
//   { type:'modifier', class: 'input-primary', desc: 'Adds `primary` color to input' },
//   { type:'modifier', class: 'input-secondary', desc: 'Adds `secondary` color to input' },
//   { type:'modifier', class: 'input-accent', desc: 'Adds `accent` color to input' },
//   { type:'modifier', class: 'input-info', desc: 'Adds `info` color to input' },
//   { type:'modifier', class: 'input-success', desc: 'Adds `success` color to input' },
//   { type:'modifier', class: 'input-warning', desc: 'Adds `warning` color to input' },
//   { type:'modifier', class: 'input-error', desc: 'Adds `error` color to input' },
//   { type:'responsive', class: 'input-lg', desc: 'Large size for input' },
//   { type:'responsive', class: 'input-md', desc: 'Medium (default) size for input' },
//   { type:'responsive', class: 'input-sm', desc: 'Small size for input' },
//   { type:'responsive', class: 'input-xs', desc: 'Extra small size for input' },
// ]}"

