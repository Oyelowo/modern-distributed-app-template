import {
  ActionIcon,
  Affix,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { MoonIcon, SunIcon } from "@modulz/radix-icons";
import { useHotkeys, useWindowScroll } from "@mantine/hooks";

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [scroll, _scrollTo] = useWindowScroll();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <Affix position={{ top: 5, right: 10 }} zIndex={3333}>
      <Transition transition="slide-up" mounted={scroll.y < 5}>
        {(transitionStyles) => (
          <ActionIcon
            variant="filled"
            style={transitionStyles}
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === "dark"
              ? <SunIcon width={20} height={20} />
              : <MoonIcon width={20} height={20} />}
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
