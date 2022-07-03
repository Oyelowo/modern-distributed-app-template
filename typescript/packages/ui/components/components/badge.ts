/* 
title: Badge
desc: Badges are used to inform user of the status of specific data.
 */

type Component = "badge"
type Modifier =
  'badge-outline'

type Responsive =
  'badge-lg' |
  'badge-md' |
  'badge-sm' |
  'badge-xs' |
  'badge-primary' |
  'badge-secondary' |
  'badge-accent' |
  'badge-ghost' |
  'badge-info' |
  'badge-success' |
  'badge-warning' |
  'badge-error';

export type BadgeClass = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'badge', desc: 'Container element' },
//   { type:'modifier', class: 'badge-outline', desc: 'transparent badge with [colorful] border' },
//   { type:'responsive', class: 'badge-lg', desc: 'badge with large size' },
//   { type:'responsive', class: 'badge-md', desc: 'badge with medium size (default)' },
//   { type:'responsive', class: 'badge-sm', desc: 'badge with small size' },
//   { type:'responsive', class: 'badge-xs', desc: 'badge with extra small size' },
//   { type:'responsive', class: 'badge-primary', desc: 'badge with `primary` color' },
//   { type:'responsive', class: 'badge-secondary', desc: 'badge with `secondary` color' },
//   { type:'responsive', class: 'badge-accent', desc: 'badge with `accent` color' },
//   { type:'responsive', class: 'badge-ghost', desc: 'badge with `ghost` color' },
//   { type:'responsive', class: 'badge-info', desc: 'badge with `info` color' },
//   { type:'responsive', class: 'badge-success', desc: 'badge with `success` color' },
//   { type:'responsive', class: 'badge-warning', desc: 'badge with `warning` color' },
//   { type:'responsive', class: 'badge-error', desc: 'badge with `error` color' },
// ]}"

