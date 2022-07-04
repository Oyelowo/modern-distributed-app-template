// title: Swap
// desc: Swap allows you to toggle the visibility of two elements using a checkbox or a class name.
type Title = "swap";
type Component = Title | `${Title}-${"on" | "off" | "indeterminate"}`;

type Modifier = `${Title}-${"active" | "rotate" | "flip"}`;

type Responsive = "";

export type TSwap = Component | Modifier | Responsive;


// data="{[
//   { type: 'component', class: 'swap', desc: 'Container element' },
//   { type: 'component', class: 'swap-on', desc: 'The child element that should be visible when checkbox is checked or when swap is active' },
//   { type: 'component', class: 'swap-off', desc: 'The child element that should be visible when checkbox is not checked or when swap is not active' },
//   { type: 'component', class: 'swap-indeterminate', desc: 'The child element that should be visible when checkbox is indeterminate' },
//   { type: 'modifier', class: 'swap-active', desc: 'Activates the swap (no need for checkbox)' },
//   { type: 'modifier', class: 'swap-rotate', desc: 'Adds rotate effect to swap' },
//   { type: 'modifier', class: 'swap-flip', desc: 'Adds flip effect to swap' },
// ]}"
