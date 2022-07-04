// title: Navbar
// desc: Navbar is used to show a navigation bar on the top of the page.

type Title = "navbar";
type Component = Title | `${Title}-${"start" | "center" | "end"}`
type Modifier = "";

type Responsive = "";

export type TNavBar = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'navbar', desc: 'Container element' },
//   { type:'component', class: 'navbar-start', desc: 'Child element, fills 50% of width to be on start' },
//   { type:'component', class: 'navbar-center', desc: 'Child element, fills remaining space to be on center' },
//   { type:'component', class: 'navbar-end', desc: 'Child element, fills 50% of width to be on end' },
// ]}"
