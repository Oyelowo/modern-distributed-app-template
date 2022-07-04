import { css, styled } from "goober";
import { forwardRef } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  isPrimary?: boolean;
}

interface Props {
  size: number;
}

// export const Button = styled(
//   "button",
//   forwardRef
// )<ButtonProps>([
//   { color: "tomato", border: "1px solid red" },
//   ({ isPrimary }) => ({ background: isPrimary ? "cyan" : "gray" }),
// ]);

export const Button = styled("button")`
  border-radius: 4px;
  color: red;
  border: 1px solid red;
`;

// import { classnames } from "tailwindcss-classnames";
// classnames("");
import t from "tailwindcss";
import {
  classnames,
  borderCollapse,
  screenReaders,
  textColor,
  TTextColor,
  TW,
} from "../tailwindcss-classnames";

// const k : TW = ""
// const k: TTextColor = TW.textColor("text-red")
classnames(TW.textColor("text-red-100"), TW.backgroundColor("xl:bg-zinc-900"));

// export function Button(props: any) {
//   return (
//     <Buttonx className="" className="btn btn-active btn-primary">
//       {props.children}
//     </Buttonx>
//   );
// }

// export default Button;
