import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Create your atoms and derivatives
const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"] as const;
export type Theme = typeof themes[number];

const themeAtom = atomWithStorage<Theme>("theme-of-app", "dark")

export const useThemeAtom = () => useAtom(themeAtom);