import HomePage from '../HomePage';
import { useSession, useSignOut } from '../../hooks/authentication';
import { useGetUserQuery, useGetUsersQuery, useMeQuery } from '@oyelowo/graphql-client';
import { client } from '../../config/client';
import { AppContext } from 'next/app';
import { useThemeAtom } from '@oyelowo/ui/components';
import {
  Button,
  AppShell,
  Navbar,
  Header,
  Container,
  Text,
  SimpleGrid,
  Burger,
  MediaQuery,
  Aside,
  Footer,
  useMantineTheme,
  ScrollArea,
  Stack,
  Box,
  Avatar,
  Indicator,
  Divider,
  Anchor,
  Space,
  Tooltip,
  Skeleton,
} from '@mantine/core';
import { ScrollToTop } from '../Scroll/ScrollToTop';
import { Star } from 'tabler-icons-react';
import { ReactElement, Suspense, useState } from 'react';
import { linkData, Navlinks } from '../NavbarCustom/Navlinks';
import { NavbarCustom } from '../NavbarCustom/NavbarCustom';
import { HeaderSimple } from '../NavbarCustom/Headers';

export function Layout({ children }: { children: ReactElement }) {
  const { signOutCustom } = useSignOut();
  // const [theme] = useThemeAtom();
  const data = useSession();
  const { data: { me } = {}, isLoading } = useMeQuery(client, {}, { staleTime: 600 * 1000 });

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  // if (isLoading) {
  //   return <>Loading...</>;
  // }

  return (
    <Skeleton visible={isLoading}>
      <Suspense fallback={<Skeleton visible={isLoading} />}>
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          fixed
          navbar={<NavbarCustom />}
          //   footer={
          //     <Footer height={60} p="md">
          //       <Container>
          //         <Anchor href="https://codebreather.com" target="_blank" rel="noopener noreferrer">
          //           Powered by Code breather
          //         </Anchor>
          //       </Container>
          //     </Footer>
          //   }
          header={<HeaderSimple links={linkData} />}
        >
          {children}
          <ScrollToTop />
        </AppShell>
      </Suspense>
    </Skeleton>
  );
}
