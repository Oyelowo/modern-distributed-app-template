
/* title: Bottom navigation
desc: It's a awesome bottom navigation! */


type Component = "btm-nav" | "btn-nav"
type Modifier =
  'btn-nav-secondary' |
  'btn-nav-accent' |
  'btn-nav-info' |
  'btn-nav-success' |
  'btn-nav-warning' |
  'btn-nav-error' |
  'btn-nav-active' |
  'btn-nav-disabled';

type Responsive =
  'btm-nav-lg' |
  'btm-nav-md' |
  'btm-nav-sm';

export type BottomNavigationClass = Component | Modifier | Responsive;



// data="{[
//   { type:'component', class: 'btm-nav', desc: 'Bottom Navigation' },
//   { type:'component', class: 'btn-nav', desc: 'A bottom navigation button' },
//   { type:'modifier', class: 'btn-nav-secondary', desc: 'Button with `secondary` color' },
//   { type:'modifier', class: 'btn-nav-accent', desc: 'Button with `accent` color' },
//   { type:'modifier', class: 'btn-nav-info', desc: 'Button with `info` color' },
//   { type:'modifier', class: 'btn-nav-success', desc: 'Button with `success` color' },
//   { type:'modifier', class: 'btn-nav-warning', desc: 'Button with `warning` color' },
//   { type:'modifier', class: 'btn-nav-error', desc: 'Button with `error` color' },
//   { type:'modifier', class: 'btn-nav-active', desc: 'Button with active state' },
//   { type:'modifier', class: 'btn-nav-disabled', desc: 'Button with disabled state' },
//   { type:'responsive', class: 'btm-nav-lg', desc: 'Large button' },
//   { type:'responsive', class: 'btm-nav-md', desc: 'Medium button (default)' },
//   { type:'responsive', class: 'btm-nav-sm', desc: 'Small button' },
// ]}"
