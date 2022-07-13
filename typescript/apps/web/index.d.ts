import { Tuple } from '@mantine/core';

// type CustomColors = 'primaryColorName' | 'secondaryColorName';

// declare module '@mantine/core' {
//     export interface MantineThemeColorsOverride {
//         colors: Record<CustomColors, Tuple<string, 10>>;
//     }
// }

// or if you want to "extend" standard colors
import { Tuple, DefaultMantineColor } from '@mantine/core';

type ExtendedCustomColors = 'primaryColorName' | 'secondaryColorName' | DefaultMantineColor;

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
    }

    export interface MantineThemeOther {
        myCustomProperty: string;
        myCustomFunction: () => void;
    }

    // MantineStyleSystemValue
}



type FilterDataType = "number_single" | "number_range" | "date_single" | "date_range" | "string" | "string_compound" | "enum" | null

declare module '@tanstack/table-core' {
    interface ColumnMeta {
        filterType: FilterDataType;
    }

    interface FilterMeta {
        itemRank: RankingInfo;
    }
}