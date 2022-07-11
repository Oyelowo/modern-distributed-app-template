import React from 'react';
import {
  GitPullRequest,
  AlertCircle,
  Messages,
  Database,
  Dashboard,
  ChartInfographic,
  ChartBar,
  Settings,
  Globe,
  HotelService,
} from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text, MantineTheme } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  link: string;
}

export function useActiveLinkStyle() {
  const router = useRouter();
  const getActiveBg = (theme: MantineTheme) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];

  return {
    getActiveStyle: (link: string, theme: MantineTheme) =>
      router.pathname === link ? getActiveBg(theme) : '',
    isActive: (link: string) => router.pathname === link,
    getActiveBg,
  };
}

function MainLink({ icon, color, label, link: to }: MainLinkProps) {
  const { getActiveStyle, getActiveBg } = useActiveLinkStyle();
  // const router = useRouter();
  // const getActiveBg = (theme: MantineTheme) =>
  //   theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];
  return (
    <Link href={to}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          backgroundColor: getActiveStyle(to, theme),

          '&:hover': {
            backgroundColor: getActiveBg(theme),
          },
        })}
        //   component="a"
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

export const linkData = [
  { icon: <ChartInfographic />, color: 'blue', label: 'Dashboard', link: '/dashboard' },
  { icon: <Settings />, color: 'teal', label: 'Settings', link: '/settings' },
  { icon: <Globe />, color: 'cyan', label: 'Maps', link: '/maps' },
  { icon: <HotelService />, color: 'indigo', label: 'Bookings', link: '/bookings' },
];

export function Navlinks() {
  const links = linkData.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
