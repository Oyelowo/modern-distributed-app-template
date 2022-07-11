import { ArrowUpIcon } from '@modulz/radix-icons';
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Transition, ActionIcon } from '@mantine/core';

export function ScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <>
      {/* <Text align="center">Affix is located at the bottom of the screen, scroll to see it</Text> */}
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              variant="filled"
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              <ArrowUpIcon />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </>
  );
}
