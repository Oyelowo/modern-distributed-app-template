// title: Footer
// desc: Footer can contain logo, copyright notice, and links to other pages.

type Component = "footer" | "footer-title";
type Modifier = "footer-center";

type Responsive = "";

export type FooterClass = Component | Modifier | Responsive;


// data="{[
//   { type:'component', class: 'footer', desc: 'Footer component' },
//   { type:'component', class: 'footer-title', desc: 'Title of a footer column' },
//   { type:'modifier', class: 'footer-center', desc: 'Aligns footer content to center' },
// ]}"
