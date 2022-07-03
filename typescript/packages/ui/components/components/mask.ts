// title: Mask
// desc: Mask crops the content of the element to common shapes.

type Title = "mask";
type Component = Title;
type Modifier =
    | 'squircle'
    | 'heart'
    | 'hexagon'
    | 'hexagon-2'
    | 'decagon'
    | 'pentagon'
    | 'diamond'
    | 'square'
    | 'circle'
    | 'parallelogram'
    | 'parallelogram-2'
    | 'parallelogram-3'
    | 'parallelogram-4'
    | 'star'
    | 'star-2'
    | 'triangle'
    | 'triangle-2'
    | 'triangle-3'
    | 'triangle-4'
    | 'half-1'
    | 'half-2';

type Responsive = "";

export type MaskClass = Component | `${Title}-${Modifier}` | Responsive;



// data="{[
//   { type:'component', class: 'mask', desc: 'Masks the content with shape' },
//   { type:'modifier', class: 'mask-squircle', desc: 'Applies `squircle` shape' },
//   { type:'modifier', class: 'mask-heart', desc: 'Applies `heart` shape' },
//   { type:'modifier', class: 'mask-hexagon', desc: 'Applies `hexagon` shape' },
//   { type:'modifier', class: 'mask-hexagon-2', desc: 'Applies `hexagon` alternative shape' },
//   { type:'modifier', class: 'mask-decagon', desc: 'Applies `decagon` shape' },
//   { type:'modifier', class: 'mask-pentagon', desc: 'Applies `pentagon` shape' },
//   { type:'modifier', class: 'mask-diamond', desc: 'Applies `diamond` shape' },
//   { type:'modifier', class: 'mask-square', desc: 'Applies `square` shape' },
//   { type:'modifier', class: 'mask-circle', desc: 'Applies `circle` shape' },
//   { type:'modifier', class: 'mask-parallelogram', desc: 'Applies `parallelogram` shape' },
//   { type:'modifier', class: 'mask-parallelogram-2', desc: 'Applies `parallelogram` alternative shape' },
//   { type:'modifier', class: 'mask-parallelogram-3', desc: 'Applies `parallelogram` alternative shape' },
//   { type:'modifier', class: 'mask-parallelogram-4', desc: 'Applies `parallelogram` alternative shape' },
//   { type:'modifier', class: 'mask-star', desc: 'Applies `star` shape' },
//   { type:'modifier', class: 'mask-star-2', desc: 'Applies `star` alternative shape' },
//   { type:'modifier', class: 'mask-triangle', desc: 'Applies `triangle` shape' },
//   { type:'modifier', class: 'mask-triangle-2', desc: 'Applies `triangle` alternative shape' },
//   { type:'modifier', class: 'mask-triangle-3', desc: 'Applies `triangle` alternative shape' },
//   { type:'modifier', class: 'mask-triangle-4', desc: 'Applies `triangle` alternative shape' },
//   { type:'modifier', class: 'mask-half-1', desc: 'Crops only the first half of mask' },
//   { type:'modifier', class: 'mask-half-2', desc: 'Crops only the second half of mask' },
// ]}"
