// import { useListBox, useOption } from "@react-aria/listbox";

// function ListBox(props) {
//   let ref = React.useRef();
//   let { listBoxRef = ref, state } = props;
//   let { listBoxProps } = useListBox(props, state, listBoxRef);

//   return (
//     <ul
//       {...listBoxProps}
//       ref={listBoxRef}
//       style={{
//         margin: 0,
//         padding: 0,
//         listStyle: "none",
//         maxHeight: "150px",
//         overflow: "auto",
//       }}
//     >
//       {[...state.collection].map((item) => (
//         <Option key={item.key} item={item} state={state} />
//       ))}
//     </ul>
//   );
// }

// function Option({ item, state }) {
//   let ref = React.useRef();
//   let { optionProps, isSelected, isFocused, isDisabled } = useOption({ key: item.key }, state, ref);

//   let backgroundColor;
//   let color = "black";

//   if (isSelected) {
//     backgroundColor = "blueviolet";
//     color = "white";
//   } else if (isFocused) {
//     backgroundColor = "gray";
//   } else if (isDisabled) {
//     backgroundColor = "transparent";
//     color = "gray";
//   }

//   return (
//     <li
//       {...optionProps}
//       ref={ref}
//       style={{
//         background: backgroundColor,
//         color: color,
//         padding: "2px 5px",
//         outline: "none",
//         cursor: "pointer",
//       }}
//     >
//       {item.rendered}
//     </li>
//   );
// }

export {}