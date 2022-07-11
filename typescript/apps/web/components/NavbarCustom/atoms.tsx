import { atom, useAtom } from 'jotai';

const navToggleAtom = atom(true);
export function useNavToggleAtom() {
  const [opened, setIsOpened] = useAtom(navToggleAtom);

  return {
    opened,
    toggleNav: () => setIsOpened(!opened),
    setNavState: (value: boolean) => setIsOpened(value),
  };
}
