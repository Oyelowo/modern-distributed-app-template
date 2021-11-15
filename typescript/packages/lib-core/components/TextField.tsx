import { useTextField } from "@react-aria/textfield";
import { InputHTMLAttributes, useRef } from "react";

type ITextFieldProps = {
  errorMessage: string;
  label: string;
  description: string;
};

export function TextField(props: ITextFieldProps) {
  let { label, description, errorMessage } = props;
  let ref = useRef<HTMLInputElement | null>(null);
  let { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(props, ref);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
      }}
    >
      <label {...labelProps}>{label}</label>
      <input style={{ color: "black" }} {...(inputProps as InputHTMLAttributes<HTMLInputElement>)} ref={ref} />
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {errorMessage && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
}
