// title: Modal
// desc: Modal is used to show a dialog or a box when you click a button.

type Title = "modal";
type Component = Title | `${Title}-${"box" | "action" | "toggle" | "button"}`;
type Modifier = `${Title}-${"open"}`;

type Responsive = `${Title}-${"bottom" | "middle"}`;

export type TModal = Component | Modifier | Responsive;

// data="{[
//   { type:'component', class: 'modal', desc: 'Container element' },
//   { type:'component', class: 'modal-box', desc: 'The content of modal' },
//   { type:'component', class: 'modal-action', desc: 'Container for modal buttons' },
//   { type:'component', class: 'modal-toggle', desc: 'For checkbox that controls modal' },
//   { type:'component', class: 'modal-button', desc: 'For <label> that checks the checkbox to opens/closes modal' },
//   { type:'modifier', class: 'modal-open', desc: 'Add/remove this class to open/close the modal using JS' },
//   { type:'responsive', class: 'modal-bottom', desc: 'Moves the modal to bottom' },
//   { type:'responsive', class: 'modal-middle', desc: 'Moves the modal to middle (default)' },
// ]}"
