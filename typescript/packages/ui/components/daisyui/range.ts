// title: Range slider
// desc: Range slider is used to select a value by sliding a handle.

import { Size, ColorVariant } from "./types";

type Title = "range";
type Component = Title;
type Modifier = `${Title}-${Extract<ColorVariant, "primary" | "secondary" | "accent">}`;

type Responsive = `${Title}-${Size}`;

export type RangeClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'range', desc: 'Range input' },
//   { type:'modifier', class: 'range-primary', desc: 'primary color' },
//   { type:'modifier', class: 'range-secondary', desc: 'secondary color' },
//   { type:'modifier', class: 'range-accent', desc: 'accent color' },
//   { type:'responsive', class: 'range-lg', desc: 'Large range' },
//   { type:'responsive', class: 'range-md', desc: 'Medium range (default)' },
//   { type:'responsive', class: 'range-sm', desc: 'Small range' },
//   { type:'responsive', class: 'range-xs', desc: 'Extra small range' },
// ]}"
