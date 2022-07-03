// title: Toggle
// desc: Toggle is a checkbox that is styled to look like a switch button.

import { ColorVariant, Size } from "../types";

type Title = "toggle";
type Component = Title | "form-control";

type Modifier = `${Title}-${Extract<ColorVariant, "primary" | "secondary" | "accent">}`;

type Responsive = `${Title}-${Size}`;

export type ToggleClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'form-control', desc: 'Container element' },
//   { type:'component', class: 'toggle', desc: 'For checkbox' },
//   { type:'modifier', class: 'toggle-primary', desc: 'Adds `primary` to toggle' },
//   { type:'modifier', class: 'toggle-secondary', desc: 'Adds `secondary` to toggle' },
//   { type:'modifier', class: 'toggle-accent', desc: 'Adds `accent` to toggle' },
//   { type:'responsive', class: 'toggle-lg', desc: 'Large toggle' },
//   { type:'responsive', class: 'toggle-md', desc: 'Medium toggle (default)' },
//   { type:'responsive', class: 'toggle-sm', desc: 'Small toggle' },
//   { type:'responsive', class: 'toggle-xs', desc: 'Extra small toggle' },
// ]}"
