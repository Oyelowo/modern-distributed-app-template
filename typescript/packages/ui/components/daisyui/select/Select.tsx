// import { SelectHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
// import { cx, TArg, TTailwindString, TW } from "../../../tailwind";
// import { useThemeAtom } from "../../theme";
// import { TSelect } from "./select.type";
// import SelectOption from "./SelectOption";

// type MakeCustomProps<Element, TCustomClass> = Omit<Element, "className"> & {
//   className?: (TArg | TSelect | false)[];
//   modifiers?: TCustomClass[];
// };

// type SelectOriginal = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

// interface SelectProps extends MakeCustomProps<SelectOriginal, TSelect> {
//   //   className?: TArg;
//   //   btnClass: TSelect;
//   theme?: string;
// }

// function isDefined(argument: TArg | TSelect | boolean): argument is TArg | TSelect {
//   return Boolean(argument);
// }

// export function Select(props: SelectProps) {
//   const [theme, setTheme] = useThemeAtom();
//   const className = props.className?.filter(isDefined) ?? [];
//   return (
//     <select
//       {...props}
//       data-theme={props.theme ?? theme}
//       className={cx(
//         // "select",
//         // "w-full",
//         // "max-w-xs",
//         // TW.fontSize("text-xs"),
//         // TW.padding("p-0"),
//         ...className
//         // props.modifiers
//       )}
//     >
//       {props.children}
//     </select>
//   );
// }

// /* 
// // Make forwardRef work with generic component
// const Select = React.forwardRef(SelectInner) as <T>(
//   props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> }
// ) => ReturnType<typeof SelectInner>

// export default Object.assign(Select, { Option: SelectOption })
// */

// // export default Object.assign(Select, { Option: SelectOption })
// Select.Option = SelectOption;



// import { HiddenSelect, useSelect } from "@react-aria/select";
// import { Item } from "@react-stately/collections";
// import { useButton } from "@react-aria/button";
// import { useSelectState } from "@react-stately/select";

// // Reuse the ListBox and Popover from your component library. See below for details.
// import { ListBox, Popover } from "your-component-library";

// function Select(props) {
//   // Create state based on the incoming props
//   let state = useSelectState(props);

//   // Get props for child elements from useSelect
//   let ref = React.useRef();
//   let { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

//   // Get props for the button based on the trigger props from useSelect
//   let { buttonProps } = useButton(triggerProps, ref);

//   return (
//     <div style={{ position: "relative", display: "inline-block" }}>
//       <div {...labelProps}>{props.label}</div>
//       <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />
//       <button {...buttonProps} ref={ref} style={{ height: 30, fontSize: 14 }}>
//         <span {...valueProps}>
//           {state.selectedItem ? state.selectedItem.rendered : "Select an option"}
//         </span>
//         <span aria-hidden="true" style={{ paddingLeft: 5 }}>
//           ▼
//         </span>
//       </button>
//       {state.isOpen && (
//         <Popover isOpen={state.isOpen} onClose={state.close}>
//           <ListBox {...menuProps} state={state} />
//         </Popover>
//       )}
//     </div>
//   );
// }

// <Select label="Favorite Color">
//   <Item>Red</Item>
//   <Item>Orange</Item>
//   <Item>Yellow</Item>
//   <Item>Green</Item>
//   <Item>Blue</Item>
//   <Item>Purple</Item>
//   <Item>Black</Item>
//   <Item>White</Item>
//   <Item>Lime</Item>
//   <Item>Fushsia</Item>
// </Select>;
export {}