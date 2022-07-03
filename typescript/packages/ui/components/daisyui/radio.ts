// title: Radio
// desc: Radio buttons allow the user to select one option from a set.

import { ColorVariant, Size } from "../types";

type Title = "radio";
type Component = Title
type Modifier = `${Title}-${Size | Extract<ColorVariant, "primary" | "secondary" | "accent">}`;

type Responsive = "";

export type RadioClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'form-control', desc: 'Container element' },
//   { type:'modifier', class: 'radio', desc: 'For radio input' },
//   { type:'modifier', class: 'radio-primary', desc: 'Adds `primary` to radio' },
//   { type:'modifier', class: 'radio-secondary', desc: 'Adds `secondary` to radio' },
//   { type:'modifier', class: 'radio-accent', desc: 'Adds `accent` to radio' },
//   { type:'modifier', class: 'radio-lg', desc: 'Large radio' },
//   { type:'modifier', class: 'radio-md', desc: 'Medium radio (default)' },
//   { type:'modifier', class: 'radio-sm', desc: 'Small radio' },
//   { type:'modifier', class: 'radio-xs', desc: 'Extra small radio' },
// ]}"
