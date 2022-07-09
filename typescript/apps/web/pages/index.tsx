import HomePage from '../components/HomePage';
import { useSession, useSignOut } from '../hooks/authentication';
import { useGetUserQuery, useGetUsersQuery, useMeQuery } from '@oyelowo/graphql-client';
import { client } from '../config/client';
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
} from '@mantine/core';
import { ScrollToTop } from '../components/Scroll/ScrollToTop';
import { Star } from 'tabler-icons-react';
import { useState } from 'react';

export default function Home() {
  const { signOutCustom } = useSignOut();
  // const [theme] = useThemeAtom();
  const data = useSession();
  const { data: { me } = {} } = useMeQuery(client, {}, { staleTime: 600 * 1000 });

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (data.status === 'loading') {
    return (
      <div className="bg-black h-screen text-white">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (data.status === 'success') {
    return (
      <>
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
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{
                // When viewport is larger than theme.breakpoints.sm, Navbar width will be 200
                sm: 200,
                // When viewport is larger than theme.breakpoints.sm, Navbar width will be 300
                lg: 300,
                // When other breakpoints do not match base width is used, defaults to 100%
                // base: 100,
              }}
            >
              <Navbar.Section>{/* Header with logo */}</Navbar.Section>
              <Navbar.Section grow mt="md" component={ScrollArea} mx="-xs" px="xs">
                <SimpleGrid cols={1}>
                  <Text spellCheck>{me?.username}</Text>
                  <Divider />
                  <Text spellCheck>{me?.email}</Text>
                  <Divider />
                  <Text spellCheck>{me?.postCount}</Text>
                  <Divider />
                </SimpleGrid>
              </Navbar.Section>
              <Navbar.Section>
                <SimpleGrid>
                  <Tooltip
                    wrapLines
                    withArrow
                    transition="fade"
                    transitionDuration={200}
                    label={me?.username}
                    color="dark"
                  >
                    <Indicator inline label="New" size={16}>
                      <Avatar color="blue" radius="lg">
                        {me?.username?.slice(0, 2) ?? <Star size={24} />}
                      </Avatar>
                    </Indicator>
                  </Tooltip>

                  <Button component="a" onClick={() => signOutCustom()}>
                    Sign out
                  </Button>
                </SimpleGrid>
              </Navbar.Section>
            </Navbar>
          }
          aside={
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Text>Extra information</Text>
              </Aside>
            </MediaQuery>
          }
          footer={
            <Footer height={60} p="md">
              <Container>
                <Anchor href="https://codebreather.com" target="_blank" rel="noopener noreferrer">
                  Powered by Code breather
                </Anchor>
              </Container>
            </Footer>
          }
          header={
            <Header height={70} p="md">
              <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>

                <Text>{data.data?.session.userId}</Text>
              </div>
            </Header>
          }
        >
          <HomePage />
          <ScrollToTop />
        </AppShell>
      </>
    );
  }

  return null;
}
