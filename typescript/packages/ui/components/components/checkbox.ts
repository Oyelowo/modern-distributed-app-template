// title: Checkbox
// desc: Checkboxes are used to select or deselect a value.

type Component = "form-control" | "checkbox";
type Modifier = 'checkbox-primary' |
    'checkbox-secondary' |
    'checkbox-accent';

type Responsive = 'checkbox-lg' |
    'checkbox-md' |
    'checkbox-sm' |
    'checkbox-xs';

export type CheckBoxClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'form-control', desc: 'Container element' },
//   { type:'component', class: 'checkbox', desc: 'For checkbox' },
//   { type:'modifier', class: 'checkbox-primary', desc: 'Adds `primary` to checkbox' },
//   { type:'modifier', class: 'checkbox-secondary', desc: 'Adds `secondary` to checkbox' },
//   { type:'modifier', class: 'checkbox-accent', desc: 'Adds `accent` to checkbox' },
//   { type:'responsive', class: 'checkbox-lg', desc: 'Large checkbox' },
//   { type:'responsive', class: 'checkbox-md', desc: 'Medium checkbox (default)' },
//   { type:'responsive', class: 'checkbox-sm', desc: 'Small checkbox' },
//   { type:'responsive', class: 'checkbox-xs', desc: 'Extra small checkbox' },
// ]}"
