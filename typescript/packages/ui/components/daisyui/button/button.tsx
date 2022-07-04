import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { cx, TArg, TTailwindString, TW } from "../../../tailwind";
import { TButton } from "./button.type";

type MakeCustomProps<Element, TCustomClass> = Omit<Element, "className"> & {
  className?: (TArg | TButton | false)[];
  modifiers?: TCustomClass[];
};

type ButtonOriginal = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface ButtonProps extends MakeCustomProps<ButtonOriginal, TButton> {
  //   className?: TArg;
  //   btnClass: TButton;
}

function isDefined(argument: TArg | TButton | boolean): argument is TArg | TButton {
  return Boolean(argument);
}

export function Button(props: ButtonProps) {
  const className = props.className?.filter(isDefined) ?? [];
  return (
    <button
      {...props}
      className={cx(
        "btn",
        "btn-primary",
        TW.fontSize("text-xs"),
        // TW.padding("p-0"),
        ...className
        // props.modifiers
      )}
    >
      {props.children}
    </button>
  );
}
