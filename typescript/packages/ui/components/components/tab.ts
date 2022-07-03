import { Size } from './../types';
// title: Tabs
// desc: Tabs can be used to show a list of links in a tabbed format.

type Title = "tabs";
type Component = Title | "tab";

type Modifier = `${"tab"}-${"active" | "bordered" | "lifted" | "boxed"}`;

type Responsive = `${Title}-${Size}`;

export type TabClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'tabs', desc: 'Container of tab items' },
//   { type:'component', class: 'tab', desc: 'A tab item' },
//   { type:'modifier', class: 'tab-active', desc: 'For the active tab' },
//   { type:'modifier', class: 'tab-bordered', desc: 'Adds bottom border to tab item' },
//   { type:'modifier', class: 'tab-lifted', desc: 'Adds lifted style to tab item' },
//   { type:'modifier', class: 'tabs-boxed', desc: 'Adds a box style to tabs container' },
//   { type:'responsive', class: 'tab-xs', desc: 'Shows tab in extra small size' },
//   { type:'responsive', class: 'tab-sm', desc: 'Shows tab in small size' },
//   { type:'responsive', class: 'tab-md', desc: 'Shows tab in medium (default) size' },
//   { type:'responsive', class: 'tab-lg', desc: 'Shows tab in large size' },
// ]}"
