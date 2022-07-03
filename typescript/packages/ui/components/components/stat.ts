// title: Stat
// desc: Stat is used to show numbers and data in a box.
type Title = "stat";
type Component = Title | `${Title}-${"title" | "value" | "desc" | "figure"}`
type Modifier = "";

type Responsive = `${Title}s-${"horizontal" | "vertical"}`;

export type StatClass = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'stats', desc: 'Container of multiple stat items' },
//   { type:'component', class: 'stat', desc: 'One stat item' },
//   { type:'component', class: 'stat-title', desc: 'Title text' },
//   { type:'component', class: 'stat-value', desc: 'Value text' },
//   { type:'component', class: 'stat-desc', desc: 'Description text' },
//   { type:'component', class: 'stat-figure', desc: 'For icon, image, etc' },
//   { type:'responsive', class: 'stats-horizontal', desc: 'Shows items horizontally (default)' },
//   { type:'responsive', class: 'stats-vertical', desc: 'Shows items vertically' },
// ]}"
