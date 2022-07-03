// title: Kbd
// desc: Kbd is used to display keyboard shortcuts.

import { Size } from "../types";

type Title = "kbd";
type Component = Title;
type Modifier = "";

type Responsive = `${Title}-${Size}`;

export type KbdClass = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'kbd', desc: 'Do show a keyboard key or a shortcut key' },
//   { type:'responsive', class: 'kbd-lg', desc: 'Large size' },
//   { type:'responsive', class: 'kbd-md', desc: 'Medium size (default)' },
//   { type:'responsive', class: 'kbd-sm', desc: 'Small size' },
//   { type:'responsive', class: 'kbd-xs', desc: 'Extra small size' },
// ]}"
