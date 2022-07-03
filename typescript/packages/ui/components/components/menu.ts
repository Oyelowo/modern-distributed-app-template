// title: Menu
// desc: Menu is used to display a list of links vertically or horizontally.

type Title = "menu";
type Component = Title | `${Title}-title`;
type Modifier = "disabled" | "active";

type Responsive = `${Title}-${"normal" | "compact" | "vertical" | "horizontal"}`;

export type MenuClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'menu', desc: 'Container <ul> element' },
//   { type:'component', class: 'menu-title', desc: 'Identify <li> as the title of menu' },
//   { type:'modifier', class: 'disabled', desc: 'Sets <li> as disabled' },
//   { type:'modifier', class: 'active', desc: 'highlights the element inside <li> as active' },
//   { type:'responsive', class: 'menu-normal', desc: 'Normal text size and normal spacing (default)' },
//   { type:'responsive', class: 'menu-compact', desc: 'Smaller text size and compact spacing' },
//   { type:'responsive', class: 'menu-vertical', desc: 'Vertical menu (default)' },
//   { type:'responsive', class: 'menu-horizontal', desc: 'Horizontal menu' }
// ]}"
