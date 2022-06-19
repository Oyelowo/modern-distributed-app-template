import "twin.macro";
import { useTextField, mergeProps } from "react-aria";
import { useRef } from "react";

type AriaTextFieldOptions = Parameters<typeof useTextField>[0];
export function TextField<T = undefined>(props: AriaTextFieldOptions & { inputProps?: T }) {
  let { label } = props;
  let ref = useRef<HTMLInputElement>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref);

  const allProps = mergeProps(inputProps, props?.inputProps ?? {});

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
      }}
    >
      <label {...labelProps}>{label}</label>
      <input tw="text-black" ref={ref} {...allProps} />
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
