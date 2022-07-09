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
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import Link from 'next/link';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
  return (
    <Link href={to}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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

const data = [
  { icon: <ChartInfographic size={16} />, color: 'blue', label: 'Dashboard', to: '/dashboard' },
  { icon: <Settings size={16} />, color: 'teal', label: 'Settings', to: '/settings' },
  { icon: <Globe size={16} />, color: 'cyan', label: 'Maps', to: '/maps' },
  { icon: <HotelService size={16} />, color: 'indigo', label: 'Bookings', to: '/bookings' },
];

export function Navlinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
