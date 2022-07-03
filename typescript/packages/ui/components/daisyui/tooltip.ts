import { PositionEdgesElement } from '../types';
// title: Tooltip

import { ColorVariant } from "../types";

// desc: Tooltip can be used to show a message when hovering over an element.
type Title = "tooltip";
type Component = Title | `${Title}-open`;

type Modifier = `${Title}-${Exclude<ColorVariant, "ghost"> | Exclude<PositionEdgesElement, "top">}`;

type Responsive = "";

export type TooltipClass = Component | Modifier | Responsive;



// data="{[
//   { type:'component', class: 'tooltip', desc: 'Container element' },
//   { type:'component', class: 'tooltip-open', desc: 'Force open tooltip' },
//   { type:'modifier', class: 'tooltip-bottom', desc: 'Put tooltip on bottom' },
//   { type:'modifier', class: 'tooltip-left', desc: 'Put tooltip on left' },
//   { type:'modifier', class: 'tooltip-right', desc: 'Put tooltip on right' },
//   { type:'modifier', class: 'tooltip-primary', desc: 'Adds `primary` color to tooltip' },
//   { type:'modifier', class: 'tooltip-secondary', desc: 'Adds `secondary` color to tooltip' },
//   { type:'modifier', class: 'tooltip-accent', desc: 'Adds `accent` color to tooltip' },
//   { type:'modifier', class: 'tooltip-info', desc: 'Adds `info` color to tooltip' },
//   { type:'modifier', class: 'tooltip-success', desc: 'Adds `success` color to tooltip' },
//   { type:'modifier', class: 'tooltip-warning', desc: 'Adds `warning` color to tooltip' },
//   { type:'modifier', class: 'tooltip-error', desc: 'Adds `error` color to tooltip' },
// ]}"
