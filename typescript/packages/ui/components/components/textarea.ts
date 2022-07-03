// title: Textarea

import { ColorVariant } from "../types";

// desc: Textarea allows users to enter text in multiple lines.
type Title = "textarea";
type Component = "form-control";
type Modifier = `${Title}-${ColorVariant}` | "label" | Title;

type Responsive = "";

export type TextAreaClass = Component | Modifier | Responsive;



// data="{[
//   { type:'component', class: 'form-control', desc: 'Container element' },
//   { type:'modifier', class: 'label', desc: 'For helper text' },
//   { type:'modifier', class: 'textarea', desc: 'For <textarea> element' },
//   { type:'modifier', class: 'textarea-bordered', desc: 'Adds border to textarea' },
//   { type:'modifier', class: 'textarea-ghost', desc: 'Adds ghost style to textarea' },
//   { type:'modifier', class: 'textarea-primary', desc: 'Adds `primary` color to textarea' },
//   { type:'modifier', class: 'textarea-secondary', desc: 'Adds `secondary` color to textarea' },
//   { type:'modifier', class: 'textarea-accent', desc: 'Adds `accent` color to textarea' },
//   { type:'modifier', class: 'textarea-info', desc: 'Adds `info` color to textarea' },
//   { type:'modifier', class: 'textarea-success', desc: 'Adds `success` color to textarea' },
//   { type:'modifier', class: 'textarea-warning', desc: 'Adds `warning` color to textarea' },
//   { type:'modifier', class: 'textarea-error', desc: 'Adds `error` color to textarea' },
// ]}"
