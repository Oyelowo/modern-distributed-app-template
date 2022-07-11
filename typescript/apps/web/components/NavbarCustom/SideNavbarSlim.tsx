import React, { useState } from 'react';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
  Drawer,
  Affix,
  Burger,
} from '@mantine/core';
import { Logout, SwitchHorizontal, Globe } from 'tabler-icons-react';
import Link from 'next/link';
import { atom, useAtom } from 'jotai';
import { linkData, useActiveLinkStyle } from './Navlinks';
import { useStylesHeader } from './Headers';
import { useSignOut } from '../../hooks/authentication/useSignOut';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon, label, active, onClick, href = '#' }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  const { isActive } = useActiveLinkStyle();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <Link href={href}>
        <UnstyledButton
          onClick={onClick}
          className={cx(classes.link, { [classes.active]: isActive(href) })}
        >
          {icon}
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const navToggleAtom = atom(true);
export function useNavToggleAtom() {
  const [opened, setIsOpened] = useAtom(navToggleAtom);

  return {
    opened,
    toggleNav: () => setIsOpened(!opened),
    setNavState: (value: boolean) => setIsOpened(value),
  };
}
export function SideNavbarSlim() {
  const [active, setActive] = useState(2);
  const { classes } = useStylesHeader();
  const { opened, toggleNav, setNavState } = useNavToggleAtom();
  const { signOutCustom } = useSignOut();

  const links = linkData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      href={link.href}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <>
      <Affix position={{ top: -5, left: opened ? 60 : 0 }} zIndex={33334}>
        <Burger opened={opened} onClick={() => toggleNav()} size="sm" />
      </Affix>
      <Drawer
        opened={opened}
        onClose={() => setNavState(false)}
        // title="Register"
        // padding="xl"
        // size="xl"
        withOverlay={false}
        size={80}
        withCloseButton={false}
      >
        <Navbar width={{ base: 80 }} p="md">
          <Center>
            <Globe />
          </Center>
          <Navbar.Section grow mt={50}>
            <Group direction="column" align="center" spacing={0}>
              {links}
            </Group>
          </Navbar.Section>
          <Navbar.Section>
            <Group direction="column" align="center" spacing={0}>
              <NavbarLink icon={<SwitchHorizontal />} label="Change account" />
              <NavbarLink onClick={signOutCustom} icon={<Logout />} label="Logout" />
            </Group>
          </Navbar.Section>
        </Navbar>
      </Drawer>
    </>
  );
}
