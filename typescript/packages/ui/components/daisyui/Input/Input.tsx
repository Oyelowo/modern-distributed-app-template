import { InputHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { cx, TArg, TTailwindString, TW } from "../../../tailwind";
import { TInput } from "./input.type";

type MakeCustomProps<Element, TCustomClass> = Omit<Element, "className"> & {
  className?: (TArg | TInput | false)[];
  modifiers?: TCustomClass[];
};

type InputOriginal = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface InputProps extends MakeCustomProps<InputOriginal, TInput> {
  //   className?: TArg;
  //   btnClass: TInput;
}

function isDefined(argument: TArg | TInput | boolean): argument is TArg | TInput {
  return Boolean(argument);
}

export function Input(props: InputProps) {
  const className = props.className?.filter(isDefined) ?? [];
  return (
    <input
      {...props}
      className={cx(
        // "btn",
        // "btn-primary",
        TW.fontSize("text-xs"),
        // TW.padding("p-0"),
        ...className
        // props.modifiers
      )}
    >
      {props.children}
    </input>
  );
}


Input.displayName = "Input";

export default Input;
// export default Object.assign(Dropdown, {
//   Toggle: DropdownToggle,
//   Menu: DropdownMenu,
//   Item: DropdownItem,
// });


