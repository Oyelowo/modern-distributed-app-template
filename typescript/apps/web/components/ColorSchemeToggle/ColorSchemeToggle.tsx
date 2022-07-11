import { ActionIcon, useMantineColorScheme, Affix, Transition } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import { useWindowScroll } from '@mantine/hooks';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [scroll, _scrollTo] = useWindowScroll();

  return (
    <Affix position={{ top: 5, right: 10 }}>
      <Transition transition="slide-up" mounted={scroll.y < 5}>
        {(transitionStyles) => (
          <ActionIcon variant="filled" style={transitionStyles} onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? (
              <SunIcon width={20} height={20} />
            ) : (
              <MoonIcon width={20} height={20} />
            )}
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
