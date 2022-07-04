// title: Drawer
// desc: Drawer is a grid layout that can show/hide a sidebar on the left or right side of the page.
type Component = "drawer" | 'drawer-toggle' | 'drawer-content' | 'drawer-side' | 'drawer-overlay';

type Modifier = "drawer-mobile" | "drawer-end";

type Responsive = "";

export type TDrawer = Component | Modifier | Responsive;



// data="{[
//   { type:'component', class: 'drawer', desc: 'Container element' },
//   { type:'component', class: 'drawer-toggle', desc: 'For checkbox element that controls the drawer' },
//   { type:'component', class: 'drawer-content', desc: 'The content container' },
//   { type:'component', class: 'drawer-side', desc: 'The sidebar container' },
//   { type:'component', class: 'drawer-overlay', desc: 'The label covers the content when drawer is open' },
//   { type:'modifier', class: 'drawer-mobile', desc: 'Makes drawer to open/close on mobile but will be always visible on desktop' },
//   { type:'modifier', class: 'drawer-end', desc: 'puts drawer to the right' },
// ]}"
