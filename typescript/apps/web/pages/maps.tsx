import HomePage from '../components/HomePage';
import { useSession, useSignOut } from '../hooks/authentication';
import { useGetUserQuery, useGetUsersQuery, useMeQuery } from '@oyelowo/graphql-client';
import { client } from '../config/client';
import { AppContext } from 'next/app';

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
import { ScrollToTop } from '../components/Scroll/ScrollToTop';
import { Star } from 'tabler-icons-react';
import { ReactElement, Suspense, useState } from 'react';
import { Navlinks } from '../components/NavbarCustom/Navlinks';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import { SpringPlay } from '../charts/d3/App';

export const Page: NextPageWithLayout = () => {
  return <p>hello world! Shown if you dont want with the layout</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {/* <HomePage /> */}
      <SpringPlay />
    </Layout>
  );
};

export default Page;

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  // Pass data to the page via props
  return { props: {} };
}
