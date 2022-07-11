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
  to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
  const router = useRouter();
  const getActiveBg = (theme: MantineTheme) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0];
  return (
    <Link href={to}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          backgroundColor: router.pathname === to ? getActiveBg(theme) : '',

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
  { icon: <ChartInfographic />, color: 'blue', label: 'Dashboard', to: '/dashboard' },
  { icon: <Settings />, color: 'teal', label: 'Settings', to: '/settings' },
  { icon: <Globe />, color: 'cyan', label: 'Maps', to: '/maps' },
  { icon: <HotelService />, color: 'indigo', label: 'Bookings', to: '/bookings' },
];

export function Navlinks() {
  const links = linkData.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
