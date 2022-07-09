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
  Skeleton,
} from '@mantine/core';
import { ScrollToTop } from '../components/Scroll/ScrollToTop';
import { Star } from 'tabler-icons-react';
import { ReactElement, Suspense, useState } from 'react';
import { Navlinks } from '../components/Navlinks/Navlinks';
import { NextPageWithLayout } from './_app';
import Layout from '../components/Layout/Layout';
import { useAtom } from 'jotai';
import React from 'react';
import MyD3Charts from '../charts/d3/App';
import Somethings, { timeAtom } from '../charts/d3/jotai/Somethings';
import ReactEChartCustom from '../charts/echarts/ChartWithHooks';
import ReactEcharts from '../charts/echarts/ReactEcharts';

const Page: NextPageWithLayout = () => {
  return <p>hello world</p>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  const [names, setStuff] = useAtom(timeAtom);
  return (
    <Layout>
      <>
        <Somethings />
        <button onClick={() => setStuff((prev) => [...prev, new Date().toISOString()])}>
          Add Time
        </button>
        <MyD3Charts />
      </>
    </Layout>
  );
};

export default Page;

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`);
//   // const data = await res.json();

//   // Pass data to the page via props
//   return { props: {} };
// }
