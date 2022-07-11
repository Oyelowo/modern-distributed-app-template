import { useGetUserQuery, useGetUsersQuery, useMeQuery } from '@oyelowo/graphql-client';
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
import { Star } from 'tabler-icons-react';
import React, { ReactElement, Suspense, useState } from 'react';
import { useAtom } from 'jotai';
import HomePage from '../components/HomePage';
import { useSession, useSignOut } from '../hooks/authentication';
import { client } from '../config/client';

import { ScrollToTop } from '../components/Scroll/ScrollToTop';
import { Navlinks } from '../components/NavbarCustom/Navlinks';
import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import MyD3Charts from '../charts/d3/App';
import Somethings, { timeAtom } from '../charts/d3/jotai/Somethings';
import ReactEChartCustom from '../charts/echarts/ChartWithHooks';
import ReactEcharts from '../charts/echarts/ReactEcharts';
import LineChart from '../charts/d3/LineChart/LineChart';

const Page: NextPageWithLayout = () => <p>hello world</p>;

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Settings />
    </Layout>
  );
};

export default Page;

function Settings() {
  const [names, setStuff] = useAtom(timeAtom);

  return (
    <>
      {/* <Somethings /> */}
      <LineChart />
      <button onClick={() => setStuff((prev) => [...prev, new Date().toISOString()])}>
        Add Time
      </button>
      <MyD3Charts />
    </>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`);
//   // const data = await res.json();

//   // Pass data to the page via props
//   return { props: {} };
// }
