// title: Carousel
// desc: Carousel show images or content in a scrollable area.

type Component = "carousel" | 'carousel-item';
type Modifier =
    'carousel-center' |
    'carousel-end' |
    'carousel-vertical';

type Responsive = "";

export type TCarousel = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'carousel', desc: 'Container element' },
//   { type:'component', class: 'carousel-item', desc: 'Carousel item' },
//   { type:'modifier', class: 'carousel-center', desc: 'Snap elements to center' },
//   { type:'modifier', class: 'carousel-end', desc: 'Snap elements to end' },
//   { type:'modifier', class: 'carousel-vertical', desc: 'Vertical carousel' },
// ]}