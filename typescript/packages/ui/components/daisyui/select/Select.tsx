import type { AriaSelectProps } from "@react-types/select";
import { useSelectState } from "@react-stately/select";
import { useSelect, HiddenSelect, useButton, mergeProps, useFocusRing } from "react-aria";
import { SelectorIcon } from "@heroicons/react/solid";

import { ListBox } from "../ListBox/ListBoxx";
import { Popover } from "../Popup/Popoverr";
import { Item } from "@react-stately/collections";
import { useRef } from "react";
import { cx, TArg, TTailwindString, TW } from "../../../tailwind";
import { useThemeAtom } from "../../theme";

// TButton
// TSelect
export function Select<T extends object>(props: AriaSelectProps<T>) {
  // Create state based on the incoming props
  let state = useSelectState(props);

  // Get props for child elements from useSelect
  let ref = useRef(null);
  let { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

  // Get props for the button based on the trigger props from useSelect
  let { buttonProps } = useButton(triggerProps, ref);

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    // <div className="inline-flex flex-col relative w-52 mt-4">
    <div
      // style={{width: 100}}
      className={cx(
        TW.display("inline-flex"),
        TW.flexDirection("flex-col"),
        TW.position("relative"),
        TW.width("w-52"),
        TW.margin("mt-4")
      )}
    >
      <div
        {...labelProps}
        className="block text-sm font-medium text-gray-700 text-left cursor-default"
      >
        {props.label}
      </div>
      <HiddenSelect state={state} triggerRef={ref} label={props.label} name={props.name} />
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={`p-1 pl-3 py-1 relative inline-flex flex-row items-center justify-between rounded-md overflow-hidden cursor-default shadow-sm border-2 outline-none ${
          isFocusVisible ? "border-pink-500" : "border-gray-300"
        } ${state.isOpen ? "bg-gray-100" : "bg-white"}`}
      >
        <span
          {...valueProps}
          className={`text-md ${state.selectedItem ? "text-gray-800" : "text-gray-500"}`}
        >
          {state.selectedItem ? state.selectedItem.rendered : "Select an option"}
        </span>
        <SelectorIcon
          //   style={{ height: 10, width: 10 }}
          className={`w-5 h-5 ${isFocusVisible ? "text-pink-500" : "text-gray-500"}`}
        />
      </button>
      {state.isOpen && (
        <Popover isOpen={state.isOpen} onClose={state.close}>
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
}

Select.Option = Item;
