// title: Rating
// desc: Rating is a set of radio buttons that allow the user to rate something.

import { Size } from "../types";

type Title = "rating";
type Component = Title;

type Modifier = `${Title}-${"half" | "hidden"}`;

type Responsive = `${Title}-${Size}`;

export type RatingClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'rating', desc: 'Wrapper component for radio buttons' },
//   { type:'modifier', class: 'rating-half', desc: 'To shows half of the shape' },
//   { type:'modifier', class: 'rating-hidden', desc: 'hides the input. Useful to clear the the rating' },
//   { type:'responsive', class: 'rating-lg', desc: 'Large rating' },
//   { type:'responsive', class: 'rating-md', desc: 'Medium rating (default)' },
//   { type:'responsive', class: 'rating-sm', desc: 'Small rating' },
//   { type:'responsive', class: 'rating-xs', desc: 'Extra small rating' },
// ]}"

