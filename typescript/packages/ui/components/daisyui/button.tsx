import { styled } from "goober";
import { Size } from "../types";
// title: Button
// desc: Buttons allows user to take actions or make choices.

import { ColorVariant } from "../types";

type Component = "btn";
type Modifier =
  | `btn-${ColorVariant}`
  | "btn-link"
  | "btn-outline"
  | "btn-active"
  | "btn-disabled"
  | "glass"
  | "loading"
  | "no-animation";

type Responsive = `btn-${Size}` | "btn-wide" | "btn-block" | "btn-circle" | "btn-square";

export type BtnClass = Component | Modifier | Responsive;

// <button class="btn btn-square loading"></button>

export const Button = styled.button`
  color: red;
`;



// data = "{[
// { type: 'component', class: 'btn', desc: 'Button' },
// { type: 'modifier', class: 'btn-primary', desc: 'Button with `primary` color' },
// { type: 'modifier', class: 'btn-secondary', desc: 'Button with `secondary` color' },
// { type: 'modifier', class: 'btn-accent', desc: 'Button with `accent` color' },
// { type: 'modifier', class: 'btn-info', desc: 'Button with `info` color' },
// { type: 'modifier', class: 'btn-success', desc: 'Button with `success` color' },
// { type: 'modifier', class: 'btn-warning', desc: 'Button with `warning` color' },
// { type: 'modifier', class: 'btn-error', desc: 'Button with `error` color' },
// { type: 'modifier', class: 'btn-ghost', desc: 'Button with ghost style' },
// { type: 'modifier', class: 'btn-link', desc: 'Button styled as a link' },
// { type: 'modifier', class: 'btn-outline', desc: 'Transparent Button with colored border' },
// { type: 'modifier', class: 'btn-active', desc: 'Force button to show active state' },
// { type: 'modifier', class: 'btn-disabled', desc: 'Force button to show disabled state' },
// { type: 'modifier', class: 'glass', desc: 'Button with a glass effect' },
// { type: 'modifier', class: 'loading', desc: 'Shows loading spinner' },
// { type: 'modifier', class: 'no-animation', desc: 'Disables click animation' },
// { type: 'responsive', class: 'btn-lg', desc: 'Large button' },
// { type: 'responsive', class: 'btn-md', desc: 'Medium button (default)' },
// { type: 'responsive', class: 'btn-sm', desc: 'Small button' },
// { type: 'responsive', class: 'btn-xs', desc: 'Extra small button' },
// { type: 'responsive', class: 'btn-wide', desc: 'Wide button (more horizontal padding)' },
// { type: 'responsive', class: 'btn-block', desc: 'Full width button' },
// { type: 'responsive', class: 'btn-circle', desc: 'Circle button with a 1:1 ratio' },
// { type: 'responsive', class: 'btn-square', desc: 'Square button with a 1:1 ratio' },
// ]}"
