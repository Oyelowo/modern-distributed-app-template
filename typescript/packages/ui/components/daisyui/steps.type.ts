// title: Steps

import { ColorVariant } from "../types";

// desc: Steps can be used to show a list of steps in a process.
type Title = "steps";
type Component = Title | "step";

type Modifier = `${"step"}-${Exclude<ColorVariant, "ghost">}`;


type Responsive = `${Title}-${"vertical" | "horizontal"}`;

export type StepsClass = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'steps', desc: 'Container of step items' },
//   { type:'component', class: 'step', desc: 'A step item' },
//   { type:'modifier', class: 'step-primary', desc: 'Adds `primary` color to step' },
//   { type:'modifier', class: 'step-secondary', desc: 'Adds `secondary` color to step' },
//   { type:'modifier', class: 'step-accent', desc: 'Adds `accent` color to step' },
//   { type:'modifier', class: 'step-info', desc: 'Adds `info` color to step' },
//   { type:'modifier', class: 'step-success', desc: 'Adds `success` color to step' },
//   { type:'modifier', class: 'step-warning', desc: 'Adds `warning` color to step' },
//   { type:'modifier', class: 'step-error', desc: 'Adds `error` color to step' },
//   { type:'responsive', class: 'steps-vertical', desc: 'makes `steps` vertical' },
//   { type:'responsive', class: 'steps-horizontal', desc: 'makes `steps` horizontal' },
// ]}"
