
// title: Link
// desc: Link adds the missing underline style to links.

type Title = "link";
type Component = Title;
type Modifier = 'link-primary' |
    'link-secondary' |
    'link-accent' |
    'link-neutral' |
    'link-hover';

type Responsive = "";

export type TLink = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'link', desc: 'Adds underline to a text' },
//   { type:'modifier', class: 'link-primary', desc: 'Link with `primary` color' },
//   { type:'modifier', class: 'link-secondary', desc: 'Link with `secondary` color' },
//   { type:'modifier', class: 'link-accent', desc: 'Link with `accent` color' },
//   { type:'modifier', class: 'link-neutral', desc: 'Link with `neutral` color' },
//   { type:'modifier', class: 'link-hover', desc: 'Only show underline on hover' },
// ]}"
