// title: Hero
// desc: Hero is a component for displaying a large box or image with a title and description.

type Component = "hero" | 'hero-content' | 'hero-overlay';
type Modifier = "";

type Responsive = "";

export type THero = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'hero', desc: 'Container element' },
//   { type:'component', class: 'hero-content', desc: 'Container for content' },
//   { type:'component', class: 'hero-overlay', desc: 'Overlay the covers the background image' },
// ]}"
