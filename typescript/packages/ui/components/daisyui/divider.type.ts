// title: Divider
// desc: Divider will be used to separate content vertically or horizontally.

type Component = "divider" | 'divider-vertical' | 'divider-horizontal';
type Modifier = "";

type Responsive = "";

export type DividerClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'divider', desc: 'Put a divider line between two elements' },
//   { type:'responsive', class: 'divider-vertical', desc: 'Divide elements on top of each other (default)' },
//   { type:'responsive', class: 'divider-horizontal', desc: 'Divide elements next to each other' },
// ]}"
