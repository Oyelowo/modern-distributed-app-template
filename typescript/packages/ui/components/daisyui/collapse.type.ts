// title: Collapse
// desc: Collapse is used for showing and hiding content.

type Component = "collapse" | 'collapse-title' | 'collapse-content';
type Modifier = 'collapse-arrow' |
    'collapse-plus' |
    'collapse-open' |
    'collapse-close';

type Responsive = "";

export type TCollapse = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'collapse', desc: 'Container element' },
//   { type:'component', class: 'collapse-title', desc: 'Title element' },
//   { type:'component', class: 'collapse-content', desc: 'Container for content' },
//   { type:'modifier', class: 'collapse-arrow', desc: 'Adds arrow icon' },
//   { type:'modifier', class: 'collapse-plus', desc: 'Adds plus/minus icon' },
//   { type:'modifier', class: 'collapse-open', desc: 'Force open' },
//   { type:'modifier', class: 'collapse-close', desc: 'Force close' },
// ]}"
