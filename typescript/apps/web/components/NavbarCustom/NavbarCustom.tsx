import React, { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Group } from '@mantine/core';
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  DeviceDesktopAnalytics,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
} from 'tabler-icons-react';
import { Globe } from 'tabler-icons-react';
import { linkData, useActiveLinkStyle } from './Navlinks';
import Link from 'next/link';

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

const mockdata = [
  { icon: Home2, label: 'Home' },
  { icon: Gauge, label: 'Dashboard' },
  { icon: DeviceDesktopAnalytics, label: 'Analytics' },
  { icon: CalendarStats, label: 'Releases' },
  { icon: User, label: 'Account' },
  { icon: Fingerprint, label: 'Security' },
  { icon: Settings, label: 'Settings' },
];

export function NavbarCustom() {
  const [active, setActive] = useState(2);

  const links = linkData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      href={link.link}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar /* height={750} */ width={{ base: 80 }} p="md">
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
          <NavbarLink icon={<Logout />} label="Logout" />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
