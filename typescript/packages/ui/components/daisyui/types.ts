
export type Btn = "btn";

export type PositionEdgesElement = "end" | "top" | "left" | "right";
export type PositionAlignment = 'start' |
    'center' |
    'end' |
    'top' |
    'middle' |
    'bottom';

export type Size =
    "lg" |
    "md" |
    "sm" |
    "xs";

export type ColorVariant =
    | "ghost"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";

type DaisyUiClassNames = Btn | `${Btn}-${ColorVariant}`;

// type TailwiindNativeClasses = TUtilityFunction<TBackgrounds | TBorders | TTypography>;

// export const twi: TailwiindNativeClasses = (clases) => {

//     // return clases.join(" ");

// }

// twi("");