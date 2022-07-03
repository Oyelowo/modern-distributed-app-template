// title: Card
// desc: Cards are used to group and display content in a way that is easily readable.

type Component = "card" | "card-title" | "card-body" | "card-actions";
type Modifier = "card-bordered" | "image-full";

type Responsive =
    'card-normal' |
    'card-compact' |
    'card-side';

export type CardClass = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'card', desc: 'Container element' },
//   { type:'component', class: 'card-title', desc: 'Title of card' },
//   { type:'component', class: 'card-body', desc: 'Container for content' },
//   { type:'component', class: 'card-actions', desc: 'Container for buttons' },
//   { type:'modifier', class: 'card-bordered', desc: 'Adds border to <card>' },
//   { type:'modifier', class: 'image-full', desc: 'The image in <figure> element will be the background' },
//   { type:'responsive', class: 'card-normal', desc: 'Applies default paddings' },
//   { type:'responsive', class: 'card-compact', desc: 'Applies smaller padding' },
//   { type:'responsive', class: 'card-side', desc: 'The image in <figure> will be on to the side' },
// ]}"
