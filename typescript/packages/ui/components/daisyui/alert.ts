type Component = "alert"
type Modifier = "";
type Responsive =
  'alert-info' |
  'alert-success' |
  'alert-warning' |
  'alert-error';

export type AlertClass = Component | Modifier | Responsive;

// data="{[
//   { type: 'component', class: 'alert', desc: 'Container element' },
//   { type: 'responsive', class: 'alert-info', desc: 'Alert with `info` color' },
//   { type: 'responsive', class: 'alert-success', desc: 'Alert with `success` color' },
//   { type: 'responsive', class: 'alert-warning', desc: 'Alert with `warning` color' },
//   { type: 'responsive', class: 'alert-error', desc: 'Alert with `error` color' },
// ]}"

