type Component = "artboard"
type Modifier =
  'artboard-demo' |
  'phone-1' |
  'phone-2' |
  'phone-3' |
  'phone-4' |
  'phone-5' |
  'phone-6' |
  'artboard-horizontal';

type Responsive = "";

export type TArtboard = Component | Modifier | Responsive;

// data="{[
//   { type: 'component', class: 'artboard', desc: 'Container element' },
//   { type: 'modifier', class: 'artboard-demo', desc: 'Adds shadow and radius. Puts items in center' },
//   { type: 'modifier', class: 'phone-1', desc: 'Size 1 (320×568)' },
//   { type: 'modifier', class: 'phone-2', desc: 'Size 2 (375×667)' },
//   { type: 'modifier', class: 'phone-3', desc: 'Size 3 (414×736)' },
//   { type: 'modifier', class: 'phone-4', desc: 'Size 4 (375×812)' },
//   { type: 'modifier', class: 'phone-5', desc: 'Size 5 (414×896)' },
//   { type: 'modifier', class: 'phone-6', desc: 'Size 6 (320×1024)' },
//   { type: 'modifier', class: 'artboard-horizontal', desc: 'shows horizontal view' },
// ]}"
