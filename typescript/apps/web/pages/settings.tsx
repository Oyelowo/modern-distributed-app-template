import React, { ReactElement } from 'react';
import { useAtom } from 'jotai';

import { NextPageWithLayout } from './_app';
import { Layout } from '../components/Layout/Layout';
import MyD3Charts from '../charts/d3/App';
import { timeAtom } from '../charts/d3/jotai/Somethings';
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
