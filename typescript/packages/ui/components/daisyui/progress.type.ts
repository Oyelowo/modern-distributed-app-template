// title: Progress
// desc: Progress bar can be used to show the progress of a task or to show the passing of time.

import { ColorVariant } from "../types";

type Title = "progress";
type Component = Title;
type Modifier = `${Title}-${Exclude<ColorVariant, "ghost">}`;

type Responsive = "";

export type ProgressClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'progress', desc: 'Progress element' },
//   { type:'modifier', class: 'progress-primary', desc: 'Adds `primary` color' },
//   { type:'modifier', class: 'progress-secondary', desc: 'Adds `secondary` color' },
//   { type:'modifier', class: 'progress-accent', desc: 'Adds `accent` color' },
//   { type:'modifier', class: 'progress-info', desc: 'Adds `info` color' },
//   { type:'modifier', class: 'progress-success', desc: 'Adds `success` color' },
//   { type:'modifier', class: 'progress-warning', desc: 'Adds `warning` color' },
//   { type:'modifier', class: 'progress-error', desc: 'Adds `error` color' },
// ]}"

