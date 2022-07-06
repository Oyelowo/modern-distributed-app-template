import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";
import { cx, TArg, TTailwindString, TW } from "../../../tailwind";
import { useThemeAtom } from "../../theme";
import { TButton } from "./button.type";

type MakeCustomProps<Element, TCustomClass> = Omit<Element, "className"> & {
  className?: (TArg | TButton | false)[];
  modifiers?: TCustomClass[];
};

type ButtonOriginal = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export interface ButtonProps extends MakeCustomProps<ButtonOriginal, TButton> {
  //   className?: TArg;
  //   btnClass: TButton;
  theme?: string;
}

function isDefined(argument: TArg | TButton | boolean): argument is TArg | TButton {
  return Boolean(argument);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [theme] = useThemeAtom();
  const className = props.className?.filter(isDefined) ?? [];
  return (
    <button
      {...props}
      data-theme={props.theme ?? theme}
      className={cx(
        "btn",
        "btn-primary",
        TW.fontSize("text-xs"),
        // TW.padding("p-0"),
        ...className
        // props.modifiers
      )}
      ref={ref}
    >
      {props.children}
    </button>
  );
});
