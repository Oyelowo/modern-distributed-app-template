import { PositionAlignment } from "./types";

// desc: Indicators are used to place an element on the corner of another element.
type Title = "indicator"

type Component = Title | `${Title}-item`;
type Modifier = `${Title}-${PositionAlignment}`;

type Responsive = "";

export type IndicatorClass = Component | Modifier | Responsive;



// data="{[
//   { type:'component', class: 'indicator', desc: 'Container element' },
//   { type:'component', class: 'indicator-item', desc: 'will be placed on the corner of sibling' },
//   { type:'responsive', class: 'indicator-start', desc: 'align horizontally to the left' },
//   { type:'responsive', class: 'indicator-center', desc: 'align horizontally to the center' },
//   { type:'responsive', class: 'indicator-end', desc: 'align horizontally to the right (default)' },
//   { type:'responsive', class: 'indicator-top', desc: 'align vertically to top (default)' },
//   { type:'responsive', class: 'indicator-middle', desc: 'align vertically to middle' },
//   { type:'responsive', class: 'indicator-bottom', desc: 'align vertically to bottom' },
// ]}"

