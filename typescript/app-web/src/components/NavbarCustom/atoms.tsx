import { atom, useAtom } from "jotai";
import { useMedia } from "react-use";

const navToggleAtom = atom(true);
export function useNavToggleAtom() {
  const [opened, setIsOpened] = useAtom(navToggleAtom);
  const isWide = useMedia("(min-width: 480px)");

  if (!isWide) {
    setIsOpened(false);
  }

  return {
    opened,
    toggleNav: () => setIsOpened(!opened),
    setNavState: (value: boolean) => setIsOpened(value),
  };
}
