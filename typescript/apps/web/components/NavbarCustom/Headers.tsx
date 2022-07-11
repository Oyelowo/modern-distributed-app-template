import React, { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Anchor,
  Button,
  Collapse,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Globe } from 'tabler-icons-react';
import Link from 'next/link';
import { useActiveLinkStyle } from './Navlinks';
import { useNavToggleAtom } from './SideNavbarSlim';

export const useStylesHeader = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
//   const [opened, toggleOpened] = useBooleanToggle(false);
   const { opened, toggleNav, setNavState } = useNavToggleAtom();
  const { classes, cx } = useStylesHeader();
  const { isActive } = useActiveLinkStyle();

  const items = links.map((link) => (
    <Link href={link.link}>
      <Button
        key={link.label}
        component="a"
        variant="subtle"
        className={cx(classes.link, { [classes.linkActive]: isActive(link.link) })}
      >
        {link.label}
      </Button>
    </Link>
  ));

  return (
    <>
      <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear">
        <Header height={60} mb={120}>
          <Container className={classes.header}>
            <div />
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>
          </Container>
        </Header>
      </Collapse>
      {/* <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" /> */}
    </>
  );
}
