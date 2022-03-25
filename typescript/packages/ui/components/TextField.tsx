import "twin.macro";
import { AriaTextFieldOptions, useTextField } from "@react-aria/textfield";
import { useRef } from "react";

// TODO: Extract into shared ui package
// function TextField(props: AriaTextFieldOptions<"input">) {
export function TextField<T>(
  props: AriaTextFieldOptions<"input"> & { inputProps?: T }
) {
  let { label } = props;
  let ref = useRef<HTMLInputElement>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
      }}
    >
      <label {...labelProps}>{label}</label>
      <input tw="text-black" {...inputProps} ref={ref} {...props.inputProps} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}
