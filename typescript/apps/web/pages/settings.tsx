import React, { ReactElement } from 'react';
import { useAtom } from 'jotai';

import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import MyD3Charts from '../charts/d3/App';
import LineChart from '../charts/d3/LineChart/LineChart';
import { useWindowSize } from 'react-use';
import { useElementSize } from '@mantine/hooks';
import VoronoiHoverTracker from '../charts/d3/Voronoi/Voronoi';

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
  const { width, height } = useWindowSize();
  const element = useElementSize();

  return (
    <div ref={element.ref}>
      <VoronoiHoverTracker width={element.width} height={600} />

      <MyD3Charts />

      <LineChart width={element.width} height={500} />
    </div>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`);
//   // const data = await res.json();

//   // Pass data to the page via props
//   return { props: {} };
// }
