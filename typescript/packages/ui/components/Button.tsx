import { css, styled } from "goober";
import { forwardRef } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  isPrimary?: boolean;
}

interface Props {
  size: number;
}

export const Button = styled(
  "button",
  forwardRef
)<ButtonProps>([
  { color: "tomato" },
  ({ isPrimary }) => ({ background: isPrimary ? "cyan" : "gray" }),
]);

// import { classnames } from "tailwindcss-classnames";
// classnames("");
import t from "tailwindcss";
import classnames, {
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
//     <Buttonx tw="" className="btn btn-active btn-primary">
//       {props.children}
//     </Buttonx>
//   );
// }
// export const ButtonSexy = tw.button`bg-pink-600 m-2 py-1.5 px-7 border-radius[0.2em] text-white`;

// export default Button;
